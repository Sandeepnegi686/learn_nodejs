import { NextFunction, Request, Response } from "express";
import Redis from "ioredis";
import client from "../utils/redisConfig";

// Extend Express Request interface to include 'redisClient'
declare global {
  namespace Express {
    interface Request {
      redisClient?: Redis;
    }
  }
}

function addRedisClientToReq(req: Request, res: Response, next: NextFunction) {
  req.redisClient = client;
  next();
}
export default addRedisClientToReq;
