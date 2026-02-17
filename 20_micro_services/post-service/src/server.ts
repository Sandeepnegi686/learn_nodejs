import express, { NextFunction, Response } from "express";
import postRouter from "./routes/postRoutes";
import authenticateUser from "./middleware/authMiddleware";
import logger from "./utils/logger";
import { connect } from "mongoose";

const PORT = process.env.PORT || 0;
const DATABASE_URL = process.env.DATABASE_URL || "";

import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middleware/errorHandler";
import limitter from "./utils/rateLimitter";
import addRedisClientToReq from "./middleware/addRedisClient";
import { connectRabbitMQ } from "./utils/rabbitmq";

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

//middleware
app.use("/", (req, res, next) => {
  logger.info(`Received ${req.method} request to ${req.url}`);
  next();
});

app.use("/api/post", authenticateUser, addRedisClientToReq, postRouter);

//DDos for IP based
app.use(limitter);

//Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server started at PORT: ${PORT}`);
  connectRabbitMQ();
  connect(DATABASE_URL)
    .then(() => logger.info("Database connected"))
    .catch((e) => logger.error(e.message));
});
