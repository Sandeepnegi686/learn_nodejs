import { NextFunction, Request, Response } from "express";

function requestLogger(req: Request, res: Response, next: NextFunction) {
  //   const time = new Date().toLocaleString();
  //   const userAgent = req.get("User-Agent");
  const url = req.url;
  const method = req.method;
  console.log(`${method} : ${url}`);
  next();
}

function addTimeStamp(req: Request, res: Response, next: NextFunction) {
  // req.timeStamp = new Date().toLocaleString();
}

export default requestLogger;
