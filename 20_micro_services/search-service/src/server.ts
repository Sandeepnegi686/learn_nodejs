import express, { NextFunction, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middleware/errorHandler";
import logger from "./utils/logger";

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

import { connect } from "mongoose";

const PORT = process.env.PORT || 0;
const DATABASE_URL = process.env.DATABASE_URL || "";

//middleware
app.use("/", (req, res, next) => {
  logger.info(`Received ${req.method} request to ${req.url}`);
  next();
});

//Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server started at PORT: ${PORT}`);
  //   connectRabbitMQ();
  connect(DATABASE_URL)
    .then(() => logger.info("Database connected"))
    .catch((e) => logger.error(e.message));
});
