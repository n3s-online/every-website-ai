import { getRedisClient, getRateLimitStatus } from "@/lib/redis";
import {
  GLOBAL_RATE_LIMIT,
  STATS_API_RATE_LIMIT,
  STATS_API_WINDOW,
} from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

/**
 * Check rate limit for stats API endpoint
 * @param ip - Client IP address
 * @returns true if allowed, false if rate limited
 */
async function checkStatsApiRateLimit(ip: string): Promise<boolean> {
  const client = getRedisClient();
  const key = `ewa:stats_api_rate_limit:${ip}`;

  try {
    const count = await client.incr(key);

    // Set expiry on first request
    if (count === 1) {
      await client.expire(key, STATS_API_WINDOW);
    }

    return count <= STATS_API_RATE_LIMIT;
  } catch (error) {
    console.error("Stats API rate limit check failed:", error);
    // Allow request if Redis fails
    return true;
  }
}

/**
 * Get client IP from request
 */
function getClientIp(request: NextRequest): string {
  // Try various headers for IP address (especially when behind proxies)
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const cfConnectingIp = request.headers.get("cf-connecting-ip");

  if (forwarded) {
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

export async function GET(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);

    // Check stats API rate limit
    const allowed = await checkStatsApiRateLimit(clientIp);
    if (!allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          message: `Too many requests. Limit: ${STATS_API_RATE_LIMIT} requests per minute.`,
        },
        { status: 429 }
      );
    }

    // Pass empty string as userIp since we only need global stats
    const status = await getRateLimitStatus("");

    return NextResponse.json({
      pagesGeneratedToday: status.globalCount || 0,
      dailyLimit: GLOBAL_RATE_LIMIT,
      remainingPages: Math.max(
        0,
        GLOBAL_RATE_LIMIT - (status.globalCount || 0)
      ),
      resetTime: status.globalResetTime,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      {
        pagesGeneratedToday: 0,
        dailyLimit: GLOBAL_RATE_LIMIT,
        remainingPages: GLOBAL_RATE_LIMIT,
        resetTime: null,
      },
      { status: 200 } // Return 200 with default values rather than error
    );
  }
}

// Cache for 30 seconds to reduce Redis calls
export const revalidate = 30;
