import { NextFunction, Request, Response } from "express";
import { APIError } from "./errorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import logger from "../utils/logger";

const JWT_SECRET = process.env.JWT_SECRET || "";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload & {
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
  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user as any;
    next();
  } catch (error) {
    logger.error("JWT token verification failed", 400);
    throw new APIError("JWT token verification failed", 400);
  }
}

export default validateToken;
