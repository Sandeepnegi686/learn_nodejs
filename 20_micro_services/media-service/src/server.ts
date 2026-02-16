import express, { NextFunction, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { connect } from "mongoose";

import mediaRouter from "./Router/mediaRoute";
import logger from "./utils/logger";
import limiter from "./utils/limmiter";

const PORT = process.env.PORT || 0;
const DATABASE_URL = process.env.DATABASE_URL || "";
const RABIT_MQ = process.env.RABIT_MQ || "";

import { errorHandler } from "./middleware/errorHandler";
import validateToken from "./middleware/validateToken";

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

//middleware
app.use("/", (req, res, next) => {
  logger.info(`Received ${req.method} request to ${req.url}`);
  next();
});

// DDos for IP based
app.use(limiter);

//JWT validation
app.use(validateToken);

//Routes
app.use("/api/media", mediaRouter);

//Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server started at PORT: ${PORT}`);
  connect(DATABASE_URL)
    .then(() => logger.info("Database connected"))
    .catch((e) => logger.error(e.message));
});
