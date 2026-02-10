import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";

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

export default proxyOptions;
