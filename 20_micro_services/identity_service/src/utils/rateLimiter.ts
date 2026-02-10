import { RateLimiterRedis } from "rate-limiter-flexible";
import redisClient from "./redisConfig";
import { NextFunction, Request, Response } from "express";
import logger from "./logger";

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rate-limit-all-routes", // redis key
  points: 300, // max request
  duration: 60 * 15, // 15 min.
});

function limiter(req: Request, res: Response, next: NextFunction) {
  rateLimiter
    .consume(req.ip as string)
    .then((rateLimiterObject) => {
      res.set({
        "X-RateLimit-Limit": rateLimiterObject.consumedPoints,
        "X-RateLimit-Remaining": rateLimiterObject.remainingPoints,
      });
      next();
    })
    .catch((error) => {
      logger.warn(error.message);
      console.log(error.message);
      return res
        .status(429)
        .json({ success: false, message: "Rate Limit exceed" });
    });
}

export default limiter;
