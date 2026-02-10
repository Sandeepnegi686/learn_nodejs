import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import logger from "./utils/logger";
import limiter from "./utils/limmiter";
import proxy from "express-http-proxy";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 0;
const IDENTITY_SERVICE_URL = process.env.IDENTITY_SERVICE_URL || "";

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

//ProxyOptions
const proxyOptions = {
  //localhost:3000/v1/auth/register ===>  localhost:3001/api/auth/register
  proxyReqPathResolver: (req: Request) => {
    return req.originalUrl.replace(/^\/v1/, "/api");
  },
  proxyErrorHandler: (err: Error, res: Response, next: NextFunction) => {
    logger.error(`Proxy Error: ${err.message}`);
    return res
      .status(500)
      .json({ success: false, message: err.message || "Something went wrong" });
  },
};
//Setting up proxy for identity service
app.use(
  "/v1/auth",
  proxy(IDENTITY_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
      // you can update headers
      proxyReqOpts.headers["Content-Type"] = "application/json";
      return proxyReqOpts;
    },
    userResDecorator: function (proxyRes, proxyResData, userReq, userRes) {
      logger.info(
        `Response received from identity service : ${proxyRes.statusCode}`,
      );
      return proxyResData;
    },
  }),
);

//Error Handler
app.use(errorHandler);
app.listen(PORT, () => logger.info(`Server started at: ${PORT}`));
