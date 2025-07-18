import { Redis } from "@upstash/redis";
import { env } from "./env";

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

// Rate limiting constants
const USER_RATE_LIMIT = 3; // 3 pages per hour per user
const GLOBAL_RATE_LIMIT = 100; // 100 pages per day globally
const USER_WINDOW = 60 * 60; // 1 hour in seconds
const GLOBAL_WINDOW = 24 * 60 * 60; // 24 hours in seconds

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

    // Check user rate limit
    const userCount = await client.incr(userKey);

    if (userCount === 1) {
      // First request from this user, set expiration
      await client.expire(userKey, USER_WINDOW);
    }

    const userTtl = await client.ttl(userKey);
    const userResetTime = now + userTtl;

    if (userCount > USER_RATE_LIMIT) {
      return {
        allowed: false,
        reason: "user_limit",
        userCount,
        userResetTime,
      };
    }

    // Check global rate limit
    const globalCount = await client.incr(globalKey);

    if (globalCount === 1) {
      // First request of the day, set expiration
      await client.expire(globalKey, GLOBAL_WINDOW);
    }

    const globalTtl = await client.ttl(globalKey);
    const globalResetTime = now + globalTtl;

    if (globalCount > GLOBAL_RATE_LIMIT) {
      // Decrement user count since we're not allowing this request
      await client.decr(userKey);

      return {
        allowed: false,
        reason: "global_limit",
        globalCount,
        globalResetTime,
      };
    }

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
    const userKey = `user_rate_limit:${userIp}`;
    const globalKey = "global_rate_limit";

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
      await client.del(`user_rate_limit:${userIp}`);
    } else {
      // Reset global limit
      await client.del("global_rate_limit");
    }
  } catch (error) {
    console.error("Failed to reset Upstash Redis rate limits:", error);
  }
}
