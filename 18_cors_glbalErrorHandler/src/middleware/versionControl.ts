import express, { Express, Request, Response, NextFunction } from "express";
import { APIError } from "./errorHandler";

function versionControl(version: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (req.path.startsWith(`/api/${version}`)) {
      next();
    } else {
      throw new APIError("Api version unsupported", 400);
    }
  };
}

function headerControl(version: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    next();
    // if (req.get("Accept-Version")) {
    // } else {
    //   throw new APIError("Header version unsupported", 400);
    // }
  };
}

export { versionControl, headerControl };
