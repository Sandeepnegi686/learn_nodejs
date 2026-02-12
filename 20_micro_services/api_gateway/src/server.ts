import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import logger from "./utils/logger";
import limiter from "./utils/limmiter";
import proxy from "express-http-proxy";
import { errorHandler } from "./middleware/errorHandler";
import proxyOptions from "./middleware/proxyOptions";
import validateToken from "./middleware/validateToken";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 0;
const IDENTITY_SERVICE_URL = process.env.IDENTITY_SERVICE_URL || "";
const POST_SERVICE_URL = process.env.POST_SERVICE_URL || "";

//middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/", (req, res, next) => {
  logger.info(`Received ${req.method} request to ${req.url}`);
  next();
});

//DDOS protection for all Routes
app.use(limiter);

//Setting up proxy for identity service
app.use(
  "/v1/auth",
  proxy(IDENTITY_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      // you can update headers
      proxyReqOpts.headers["Content-Type"] = "application/json";
      proxyReqOpts.headers["x-user-id"] = srcReq.user.userId;
      return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(
        `Response received from identity service : ${proxyRes.statusCode}`,
      );
      return proxyResData;
    },
  }),
);

//Setting up proxy for post service
app.use(
  "/v1/post",
  validateToken,
  proxy(POST_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      // you can update headers
      proxyReqOpts.headers["Content-Type"] = "application/json";
      return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(
        `Response received from post service : ${proxyRes.statusCode}`,
      );
      return proxyResData;
    },
  }),
);

//Error Handler
app.use(errorHandler);
app.listen(PORT, () => logger.info(`Server started at: ${PORT}`));

// unhandled promise rejection
process.on("unhandledRejection", (reason, promise) => {
  logger.error("unhandled Rejection at :", promise, "reason : ", reason);
});
