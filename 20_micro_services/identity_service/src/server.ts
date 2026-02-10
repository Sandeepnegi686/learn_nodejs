import mongoose from "mongoose";
import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";

import indentityServiceRouter from "./routes/identity-service";
import { errorHandler } from "./middleware/errorHandler";
import logger from "./utils/logger";
import rateLimiter from "./utils/rateLimiter";
import sensitiveRateLimiter from "./utils/sensitiveRateLimiter";
import limiter from "./utils/rateLimiter";

const app = express();
const DB_URL = process.env.DATABASE_URL || "";
const PORT = process.env.PORT || 0;

dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(cors());

//middleware
app.use("/", (req, res, next) => {
  logger.info(`Received ${req.method} request to ${req.url}`);
  next();
});

//DDOS protection and rate limiting.
app.use(limiter);

//Rate Limiter for routes or sensative endpoints
app.use("/api/auth/register", sensitiveRateLimiter);

//Routes.  ===>.   http://localhost:3001/api/auth/register
app.use("/api/auth", indentityServiceRouter);

//Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`server started at port ${PORT}`);
  mongoose
    .connect(DB_URL)
    .then(() => logger.info("Database connected"))
    .catch((e) => logger.error(e));
});

// unhandled promise rejection
process.on("unhandledRejection", (reason, promise) => {
  logger.error("unhandled Rejection at :", promise, "reason : ", reason);
});
