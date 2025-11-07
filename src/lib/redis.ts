import { Redis } from "@upstash/redis";
import { env } from "./env";
import {
  USER_RATE_LIMIT,
  GLOBAL_RATE_LIMIT,
  USER_WINDOW,
  GLOBAL_WINDOW,
} from "./constants";

// Create Upstash Redis client
let redis: Redis | null = null;

export function getRedisClient(): Redis {
  if (!redis) {
    redis = new Redis({
      url: env.UPSTASH_REDIS_REST_URL,
      token: env.UPSTASH_REDIS_REST_TOKEN,
    });
  }

  return redis;
}

/**
 * Lua script for atomic rate limit check-and-increment
 * This prevents race conditions by making the check and increment atomic
 *
 * Returns: [allowed (0 or 1), count, ttl]
 * - If over limit: [0, current_count, 0]
 * - If allowed: [1, new_count, ttl]
 */
const RATE_LIMIT_LUA_SCRIPT = `
local key = KEYS[1]
local limit = tonumber(ARGV[1])
local window = tonumber(ARGV[2])

local count = redis.call('GET', key)
if count == false then
  count = 0
else
  count = tonumber(count)
end

-- Check if over limit BEFORE incrementing
if count >= limit then
  local ttl = redis.call('TTL', key)
  return {0, count, ttl}
end

-- Increment since we're under the limit
local newCount = redis.call('INCR', key)

-- Set expiry if first request
if newCount == 1 then
  redis.call('EXPIRE', key, window)
end

-- Get TTL for reset time
local ttl = redis.call('TTL', key)

return {1, newCount, ttl}
`;

export interface RateLimitResult {
  allowed: boolean;
  reason?: "user_limit" | "global_limit";
  userCount?: number;
  globalCount?: number;
  userResetTime?: number;
  globalResetTime?: number;
}

/**
 * Check if a user can generate a new page based on rate limits
 * Uses Lua scripts for atomic check-and-increment to prevent race conditions
 * @param userIp - User's IP address (used as identifier)
 * @returns Promise<RateLimitResult>
 */
export async function checkRateLimit(userIp: string): Promise<RateLimitResult> {
  if (env.NODE_ENV === "development") {
    return {
      allowed: true,
    };
  }
  const client = getRedisClient();

  try {
    const now = Math.floor(Date.now() / 1000);
    const userKey = `ewa:user_rate_limit:${userIp}`;
    const globalKey = "ewa:global_rate_limit";

    // Check user rate limit using atomic Lua script
    const userResult = await client.eval(
      RATE_LIMIT_LUA_SCRIPT,
      [userKey],
      [USER_RATE_LIMIT, USER_WINDOW]
    ) as [number, number, number];

    const [userAllowed, userCount, userTtl] = userResult;
    const userResetTime = userTtl > 0 ? now + userTtl : now + USER_WINDOW;

    // If user limit exceeded, return immediately (counter was NOT incremented)
    if (userAllowed === 0) {
      return {
        allowed: false,
        reason: "user_limit",
        userCount,
        userResetTime,
      };
    }

    // Check global rate limit using atomic Lua script
    const globalResult = await client.eval(
      RATE_LIMIT_LUA_SCRIPT,
      [globalKey],
      [GLOBAL_RATE_LIMIT, GLOBAL_WINDOW]
    ) as [number, number, number];

    const [globalAllowed, globalCount, globalTtl] = globalResult;
    const globalResetTime = globalTtl > 0 ? now + globalTtl : now + GLOBAL_WINDOW;

    // If global limit exceeded, rollback user counter
    if (globalAllowed === 0) {
      // Decrement user count since we're not allowing this request
      await client.decr(userKey);

      return {
        allowed: false,
        reason: "global_limit",
        globalCount,
        globalResetTime,
      };
    }

    // Both checks passed
    return {
      allowed: true,
      userCount,
      globalCount,
      userResetTime,
      globalResetTime,
    };
  } catch (error) {
    console.error("Upstash Redis rate limit check failed:", error);
    // If Redis is down, allow the request but log the error
    // In production, you might want to implement a fallback strategy
    return {
      allowed: true,
    };
  }
}

/**
 * Get current rate limit status without incrementing counters
 * @param userIp - User's IP address
 * @returns Promise<RateLimitResult>
 */
export async function getRateLimitStatus(
  userIp: string
): Promise<RateLimitResult> {
  const client = getRedisClient();

  try {
    const now = Math.floor(Date.now() / 1000);
    const userKey = `ewa:user_rate_limit:${userIp}`;
    const globalKey = "ewa:global_rate_limit";

    const [userCount, userTtl, globalCount, globalTtl] = await Promise.all([
      client.get(userKey),
      client.ttl(userKey),
      client.get(globalKey),
      client.ttl(globalKey),
    ]);

    const userCountNum = parseInt(String(userCount || "0"));
    const globalCountNum = parseInt(String(globalCount || "0"));

    const userResetTime = userTtl > 0 ? now + userTtl : 0;
    const globalResetTime = globalTtl > 0 ? now + globalTtl : 0;

    if (userCountNum >= USER_RATE_LIMIT) {
      return {
        allowed: false,
        reason: "user_limit",
        userCount: userCountNum,
        userResetTime,
      };
    }

    if (globalCountNum >= GLOBAL_RATE_LIMIT) {
      return {
        allowed: false,
        reason: "global_limit",
        globalCount: globalCountNum,
        globalResetTime,
      };
    }

    return {
      allowed: true,
      userCount: userCountNum,
      globalCount: globalCountNum,
      userResetTime,
      globalResetTime,
    };
  } catch (error) {
    console.error("Upstash Redis rate limit status check failed:", error);
    return {
      allowed: true,
    };
  }
}

/**
 * Reset rate limits (for testing or admin purposes)
 */
export async function resetRateLimits(userIp?: string): Promise<void> {
  const client = getRedisClient();

  try {
    if (userIp) {
      await client.del(`ewa:user_rate_limit:${userIp}`);
    } else {
      // Reset global limit
      await client.del("ewa:global_rate_limit");
    }
  } catch (error) {
    console.error("Failed to reset Upstash Redis rate limits:", error);
  }
}
