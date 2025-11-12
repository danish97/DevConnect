import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Redis connection
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Create a rate limiter function generator
export const createRateLimiter = (limit, windowSeconds) => {
  const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
    analytics: true,
  });

  return async (req, res, next) => {
    try {
      // Identify user or fallback to IP
      const identifier = req.user?.userId || req.ip;
      const { success, limit, remaining, reset } = await ratelimit.limit(identifier);

      if (!success) {
        return res.status(429).json({
          error: "Too many requests. Please try again later.",
          limit,
          remaining,
          reset,
        });
      }

      next();
    } catch (error) {
      console.error("Rate limiting error:", error);
      res.status(500).json({ error: "Rate limit check failed" });
    }
  };
};
