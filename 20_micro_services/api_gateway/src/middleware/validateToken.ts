import { NextFunction, Request, Response } from "express";
import { APIError } from "./errorHandler";
import jwt from "jsonwebtoken";
import logger from "../utils/logger";

const JWT_SECRET = process.env.JWT_SECRET || "";

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string;
        username?: string;
      };
    }
  }
}

function validateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) throw new APIError("token not provided", 400);
  const token = authHeader.split(" ")[1];
  if (!token) throw new APIError("token not provided", 400);
  jwt.verify(token, JWT_SECRET, (error, user) => {
    if (error) {
      logger.error("JWT token verification failed", 400);
      throw new APIError("JWT token verification failed", 400);
    }
    req.user = user as any;
    next();
  });
}

export default validateToken;
