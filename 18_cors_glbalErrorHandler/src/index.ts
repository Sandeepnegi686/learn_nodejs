import express, { Express, Request, Response, NextFunction } from "express";
import { connect } from "mongoose";

import UserModel from "./model/schema";
import corsConfiguration from "./config/corsConfig";
import requestLogger from "./middleware/requestLogger";
import {
  APIError,
  asyncHandler,
  globalErrorHandler,
} from "./middleware/errorHandler";
import { versionControl } from "./middleware/versionControl";
import { limiter } from "./middleware/rateLimiter";

const DB_URL = "";

const app = express();
app.use(limiter);
app.use(versionControl("v1"));
// app.use(headerControl("v1"));
app.use(corsConfiguration());
app.use(requestLogger);

app.use("/api/v1/users", asyncHandler(getUsers));
app.use("/api/v1/hello", function (req, res) {
  return res.status(200).json({ success: true, message: "Hello" });
});
app.use(globalErrorHandler);

app.listen(5500, () => {
  console.log("server started at PORT:5500");
  connect(DB_URL)
    .then(() => console.log("Database connected"))
    .catch((e) => console.log(e));
});

async function getUsers(req: Request, res: Response, next: NextFunction) {
  const users = await UserModel.find();
  if (!users.length) {
    throw new APIError("Not found anything", 400);
  }
  return res.status(200).json({ success: true, data: users });
}
