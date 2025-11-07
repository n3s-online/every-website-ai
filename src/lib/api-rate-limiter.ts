import { NextRequest } from "next/server";
import { getRedisClient } from "./redis";

export interface RateLimitOptions {
  /**
   * Maximum number of requests allowed in the window
   */
  limit: number;
  /**
   * Time window in seconds
   */
  window: number;
  /**
   * Redis key prefix for this rate limiter
   * @example "api:stats" will create keys like "ewa:api:stats:rate_limit:{ip}"
   */
  keyPrefix: string;
}

export interface RateLimitResult {
  /**
   * Whether the request is allowed
   */
  allowed: boolean;
  /**
   * Current request count in the window
   */
  count: number;
  /**
   * Maximum requests allowed
   */
  limit: number;
  /**
   * Remaining requests in the window
   */
  remaining: number;
  /**
   * Unix timestamp when the rate limit resets
   */
  resetTime: number | null;
}

/**
 * Extract client IP from Next.js request
 * Checks various headers for IP address, especially when behind proxies
 */
export function getClientIp(request: NextRequest): string {
  // Try various headers for IP address (especially when behind proxies)
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");

  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, use the first one
    return forwarded.split(",")[0].trim();
  }
  if (realIp) {
    return realIp;
  }
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  return "unknown";
}

/**
 * Check rate limit for an API endpoint
 * @param ip - Client IP address
 * @param options - Rate limit configuration
 * @returns Promise<RateLimitResult>
 */
export async function checkApiRateLimit(
  ip: string,
  options: RateLimitOptions
): Promise<RateLimitResult> {
  const client = getRedisClient();
  const key = `ewa:${options.keyPrefix}:rate_limit:${ip}`;

  try {
    const now = Math.floor(Date.now() / 1000);

    // Get current count before incrementing
    const currentCount = await client.get<number>(key);
    const count = currentCount || 0;

    // Check if over limit BEFORE incrementing
    if (count >= options.limit) {
      const ttl = await client.ttl(key);
      const resetTime = ttl > 0 ? now + ttl : null;

      return {
        allowed: false,
        count,
        limit: options.limit,
        remaining: 0,
        resetTime,
      };
    }

    // Increment counter
    const newCount = await client.incr(key);

    // Set expiry on first request
    if (newCount === 1) {
      await client.expire(key, options.window);
    }

    // Get TTL for reset time
    const ttl = await client.ttl(key);
    const resetTime = ttl > 0 ? now + ttl : now + options.window;

    return {
      allowed: true,
      count: newCount,
      limit: options.limit,
      remaining: Math.max(0, options.limit - newCount),
      resetTime,
    };
  } catch (error) {
    console.error(
      `Rate limit check failed for ${options.keyPrefix}:`,
      error
    );
    // Allow request if Redis fails (fail open)
    return {
      allowed: true,
      count: 0,
      limit: options.limit,
      remaining: options.limit,
      resetTime: null,
    };
  }
}

/**
 * Create a rate limit response when limit is exceeded
 * Returns a consistent 429 error response with retry-after header
 */
export function createRateLimitResponse(result: RateLimitResult) {
  const retryAfter =
    result.resetTime !== null
      ? Math.max(0, result.resetTime - Math.floor(Date.now() / 1000))
      : 60;

  return new Response(
    JSON.stringify({
      error: "Rate limit exceeded",
      message: `Too many requests. Limit: ${result.limit} requests per ${retryAfter}s. Try again in ${retryAfter} seconds.`,
      limit: result.limit,
      remaining: 0,
      resetTime: result.resetTime,
    }),
    {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": retryAfter.toString(),
        "X-RateLimit-Limit": result.limit.toString(),
        "X-RateLimit-Remaining": "0",
        "X-RateLimit-Reset": result.resetTime?.toString() || "",
      },
    }
  );
}

/**
 * Add rate limit headers to a successful response
 */
export function addRateLimitHeaders(
  response: Response,
  result: RateLimitResult
): Response {
  const headers = new Headers(response.headers);
  headers.set("X-RateLimit-Limit", result.limit.toString());
  headers.set("X-RateLimit-Remaining", result.remaining.toString());
  if (result.resetTime) {
    headers.set("X-RateLimit-Reset", result.resetTime.toString());
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
