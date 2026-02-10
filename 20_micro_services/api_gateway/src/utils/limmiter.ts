import { rateLimit } from "express-rate-limit";
import RedisStore, { RedisReply } from "rate-limit-redis";
import client from "./redisConfig";
import logger from "./logger";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  handler: (req, res) => {
    logger.warn(`Sensitive endpoint: rate limit exceed for ip: ${req.ip}`);
    return res
      .status(429)
      .json({ success: false, message: "Rate Limit exceed" });
  },
  store: new RedisStore({
    sendCommand: (command: string, ...args: string[]) =>
      client.call(command, ...args) as Promise<RedisReply>,
  }),
});

export default limiter;
