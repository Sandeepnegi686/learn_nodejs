import { Request, Response, NextFunction } from "express";

class APIError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "API Error";
  }
}

// async function asyncHandler();
// const asyncHandler = (fn) => (req, res, next) => {
//   Promise.resolve(fn(req, res, next)).catch(next);
// };
type FuncType = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

function asyncHandler(func: FuncType) {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(func(req, res, next)).catch(next);
  };
}

function globalErrorHandler(
  err: typeof Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof APIError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  } else if (err.name == "validation error") {
    return res
      .status(400)
      .json({ success: false, message: "mongoose validation error" });
  } else {
    return res
      .status(500)
      .json({ success: false, message: "something went wrong on server" });
  }
}

export { asyncHandler, globalErrorHandler, APIError };
