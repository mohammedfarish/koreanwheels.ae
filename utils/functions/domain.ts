import { headers } from "next/headers";

import isdev from "./isdev";

export const getDomain = async () => {
  const headersList = await headers();
  const host = headersList.get("host");
  if (!host) throw new Error("Host not found");
  if (isdev) return "somedomain.com";
  return host;
};

export const getIP = async () => {
  const headersList = await headers();

  // 1. Cloudflare's CF-Connecting-IP header (most reliable when behind Cloudflare)
  const cfConnectingIp = headersList.get("cf-connecting-ip");
  if (cfConnectingIp) {
    return cfConnectingIp.trim();
  }

  // 2. X-Forwarded-For header (may contain multiple IPs, first one is the client)
  const xForwardedFor = headersList.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }

  // 3. X-Real-IP header (common in nginx proxies)
  const xRealIp = headersList.get("x-real-ip");
  if (xRealIp) {
    return xRealIp.trim();
  }

  // 4. X-Client-IP header (less common)
  const xClientIp = headersList.get("x-client-ip");
  if (xClientIp) {
    return xClientIp.trim();
  }

  // 5. X-Forwarded header (less common, may contain multiple IPs)
  const xForwarded = headersList.get("x-forwarded");
  if (xForwarded) {
    return xForwarded.split(",")[0].trim();
  }

  return undefined;
};
