import { NextFunction, Request, Response } from "express";

type FuncType = (
  req: Request,
  res: Response,
  next?: NextFunction,
) => Promise<any>;

function asyncHandler(func: FuncType) {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(func(req, res, next)).catch(next);
  };
}

export default asyncHandler;
