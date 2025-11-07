import { getRateLimitStatus } from "@/lib/redis";
import { NextResponse } from "next/server";

const GLOBAL_RATE_LIMIT = 100; // Should match the constant in redis.ts

export async function GET() {
  try {
    // Pass empty string as userIp since we only need global stats
    const status = await getRateLimitStatus("");

    return NextResponse.json({
      pagesGeneratedToday: status.globalCount || 0,
      dailyLimit: GLOBAL_RATE_LIMIT,
      remainingPages: Math.max(0, GLOBAL_RATE_LIMIT - (status.globalCount || 0)),
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
