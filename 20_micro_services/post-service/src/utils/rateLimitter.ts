import { NextFunction, Request, Response } from "express";
import client from "./redisConfig";
import { RateLimiterRedis } from "rate-limiter-flexible";
import logger from "./logger";

const opts = {
  // Basic options
  storeClient: client,
  keyPrefix: "rate-limit-all-routes", // redis key
  useRedisPackage: true, // use this flag for the latest redis package
  points: 5, // Number of points
  duration: 5, // Per second(s)

  // Custom
  blockDuration: 0, // Do not block if consumed more than points
};

const rateLimiterRedis = new RateLimiterRedis(opts);

function limitter(req: Request, res: Response, next: NextFunction) {
  rateLimiterRedis
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

export default limitter;
