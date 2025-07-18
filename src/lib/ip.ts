import { headers } from "next/headers";

/**
 * Get the user's IP address from request headers
 * Handles various proxy headers and fallbacks
 */
export async function getUserIP(): Promise<string> {
  const headersList = await headers();
  
  // Check various headers that might contain the real IP
  const forwardedFor = headersList.get("x-forwarded-for");
  const realIP = headersList.get("x-real-ip");
  const cfConnectingIP = headersList.get("cf-connecting-ip");
  const xClientIP = headersList.get("x-client-ip");
  
  // x-forwarded-for can contain multiple IPs, take the first one
  if (forwardedFor) {
    const ips = forwardedFor.split(",").map(ip => ip.trim());
    return ips[0];
  }
  
  // Try other headers
  if (cfConnectingIP) return cfConnectingIP;
  if (realIP) return realIP;
  if (xClientIP) return xClientIP;
  
  // Fallback to a default IP for development/testing
  return "127.0.0.1";
}
