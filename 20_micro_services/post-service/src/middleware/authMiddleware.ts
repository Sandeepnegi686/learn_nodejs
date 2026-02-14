import { NextFunction, Request, Response } from "express";

function authenticateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.headers["x-user-id"] as string;
    if (!userId) {
      return res.status(401).json({ s: false, m: "unauthorized" });
    }
    req.user = {
      userId,
    };
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ s: false, m: "unauthorized" });
  }
}

export default authenticateUser;
