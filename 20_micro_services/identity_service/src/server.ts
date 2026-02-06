import mongoose from "mongoose";
import express, { NextFunction } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
dotenv.config();

import indentityServiceRouter from "./routes/identity-service";
import { errorHandler } from "./middleware/errorHandler";
import logger from "./utils/logger";

const app = express();
const DB_URL = process.env.DB_URL || "";

//middleware
app.use("/", (req, res, next) => {
  logger.info(`Received ${req.method} request to ${req.url}`);
  next();
});
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/", indentityServiceRouter);

app.use(errorHandler);

app.listen(3000, () => {
  logger.info("server started at port 3000");
  mongoose
    .connect(DB_URL)
    .then(() => logger.info("Database connected"))
    .catch((e) => logger.error(e));
});
