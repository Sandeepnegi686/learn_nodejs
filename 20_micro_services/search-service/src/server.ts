import express, { NextFunction, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middleware/errorHandler";
import logger from "./utils/logger";
import searchRouter from "./Routes/searchRouter";

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

import { connect } from "mongoose";
import { connectRabbitMQ, consumeEvent } from "./utils/rabbitmq";
import { handlePostCreated } from "./Events/searchEventHandler";

const PORT = process.env.PORT || 0;
const DATABASE_URL = process.env.DATABASE_URL || "";

//middleware
app.use("/", (req, res, next) => {
  logger.info(`Received ${req.method} request to ${req.url}`);
  next();
});

//Router
app.use("/api/search", searchRouter);

//Error Handler
app.use(errorHandler);

//Server
async function startServer() {
  try {
    await connectRabbitMQ();

    //consume all the events
    await consumeEvent("post.created", handlePostCreated);

    app.listen(PORT, () => {
      logger.info(`Server started at PORT: ${PORT}`);
      connect(DATABASE_URL)
        .then(() => logger.info("Database connected"))
        .catch((e) => logger.error(e.message));
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

startServer();
