/**
 * Test script to verify concurrent rate limiting works correctly
 *
 * This script simulates multiple concurrent requests to verify that:
 * 1. The Lua script prevents race conditions
 * 2. Only the correct number of requests are allowed
 * 3. Counters remain accurate under concurrent load
 *
 * Prerequisites:
 * - Create a .env file with UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
 * - Or set NODE_ENV=production to bypass development mode check
 *
 * Run with: NODE_ENV=production npx tsx scripts/test-rate-limit.ts
 */

import { checkRateLimit, resetRateLimits } from "../src/lib/redis";

async function simulateConcurrentRequests(
  userIp: string,
  numRequests: number
): Promise<{ allowed: number; rejected: number }> {
  console.log(`\n🚀 Simulating ${numRequests} concurrent requests from ${userIp}...`);

  // Fire all requests concurrently
  const promises = Array.from({ length: numRequests }, (_, i) =>
    checkRateLimit(userIp)
      .then((result) => ({ index: i, ...result }))
      .catch((error) => ({ index: i, error }))
  );

  const results = await Promise.all(promises);

  // Count allowed vs rejected
  const allowed = results.filter((r) => "allowed" in r && r.allowed).length;
  const rejected = results.filter((r) => "allowed" in r && !r.allowed).length;
  const errors = results.filter((r) => "error" in r).length;

  console.log(`✅ Allowed: ${allowed}`);
  console.log(`❌ Rejected: ${rejected}`);
  if (errors > 0) {
    console.log(`⚠️  Errors: ${errors}`);
  }

  // Show reasons for rejection
  const userLimitRejections = results.filter(
    (r) => "allowed" in r && !r.allowed && r.reason === "user_limit"
  ).length;
  const globalLimitRejections = results.filter(
    (r) => "allowed" in r && !r.allowed && r.reason === "global_limit"
  ).length;

  if (userLimitRejections > 0) {
    console.log(`   └─ User limit: ${userLimitRejections}`);
  }
  if (globalLimitRejections > 0) {
    console.log(`   └─ Global limit: ${globalLimitRejections}`);
  }

  // Show final counter values
  const lastAllowed = results.find((r) => "allowed" in r && r.allowed);
  if (lastAllowed && "userCount" in lastAllowed) {
    console.log(`\n📊 Final user counter: ${lastAllowed.userCount}/3`);
  }

  return { allowed, rejected };
}

async function runTests() {
  console.log("🧪 Testing Concurrent Rate Limiting");
  console.log("=====================================");

  try {
    // Test 1: Single user, concurrent requests
    console.log("\n📝 Test 1: Single user with 10 concurrent requests");
    console.log("Expected: 3 allowed, 7 rejected");
    await resetRateLimits("test-user-1");
    const test1 = await simulateConcurrentRequests("test-user-1", 10);

    if (test1.allowed === 3 && test1.rejected === 7) {
      console.log("✅ Test 1 PASSED");
    } else {
      console.log("❌ Test 1 FAILED");
      console.log(`   Expected: 3 allowed, 7 rejected`);
      console.log(`   Got: ${test1.allowed} allowed, ${test1.rejected} rejected`);
    }

    // Test 2: Multiple users, concurrent requests
    console.log("\n📝 Test 2: 3 users with 5 concurrent requests each");
    console.log("Expected: Each user gets 3 allowed, 2 rejected");
    await resetRateLimits("test-user-2a");
    await resetRateLimits("test-user-2b");
    await resetRateLimits("test-user-2c");

    const [test2a, test2b, test2c] = await Promise.all([
      simulateConcurrentRequests("test-user-2a", 5),
      simulateConcurrentRequests("test-user-2b", 5),
      simulateConcurrentRequests("test-user-2c", 5),
    ]);

    const allPassed =
      test2a.allowed === 3 &&
      test2a.rejected === 2 &&
      test2b.allowed === 3 &&
      test2b.rejected === 2 &&
      test2c.allowed === 3 &&
      test2c.rejected === 2;

    if (allPassed) {
      console.log("✅ Test 2 PASSED - All users got correct limits");
    } else {
      console.log("❌ Test 2 FAILED - User limits not correctly enforced");
    }

    // Test 3: Verify counters are accurate
    console.log("\n📝 Test 3: Sequential requests after concurrent ones");
    console.log("Expected: Should be immediately rejected (counter should be at 3)");
    const test3 = await checkRateLimit("test-user-1");

    if (!test3.allowed && test3.userCount === 3) {
      console.log("✅ Test 3 PASSED - Counter accurate, request rejected");
    } else {
      console.log("❌ Test 3 FAILED - Counter not accurate");
      console.log(`   Counter: ${test3.userCount}, Allowed: ${test3.allowed}`);
    }

    console.log("\n=====================================");
    console.log("🏁 Tests Complete!");
    console.log("\n💡 The atomic Lua script ensures:");
    console.log("   • No race conditions in concurrent requests");
    console.log("   • Counters remain accurate");
    console.log("   • Only allowed requests increment counters");

  } catch (error) {
    console.error("\n❌ Test suite failed:", error);
    process.exit(1);
  }
}

// Run tests
runTests()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });
