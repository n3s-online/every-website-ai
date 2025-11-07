import { getRateLimitStatus } from "@/lib/redis";
import {
  GLOBAL_RATE_LIMIT,
  STATS_API_RATE_LIMIT,
  STATS_API_WINDOW,
} from "@/lib/constants";
import {
  checkApiRateLimit,
  createRateLimitResponse,
  getClientIp,
} from "@/lib/api-rate-limiter";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);

    // Check stats API rate limit using reusable utility
    const rateLimitResult = await checkApiRateLimit(clientIp, {
      limit: STATS_API_RATE_LIMIT,
      window: STATS_API_WINDOW,
      keyPrefix: "api:stats",
    });

    if (!rateLimitResult.allowed) {
      return createRateLimitResponse(rateLimitResult);
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
