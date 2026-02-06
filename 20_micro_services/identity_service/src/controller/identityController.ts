import { NextFunction, Request, Response } from "express";

import UserModel from "../Model/User";
import RefreshTokenModel from "../Model/RefreshToken";
import logger from "../utils/logger";
import { validateRegistration } from "../utils/validation";
import { APIError } from "../middleware/errorHandler";
import { generateToken } from "../utils/generateToken";

type RegistrationRequestBodyType = {
  username: string;
  email: string;
  password: string;
};

//Registration
async function registrationUser(
  req: Request<{}, {}, RegistrationRequestBodyType>,
  res: Response,
  next: NextFunction,
) {
  logger.info("user registration start");
  if (!validateRegistration(req.body))
    throw new APIError("required all fields", 400);
  const { email, username, password } = req.body;
  const existingUser = await UserModel.find({ $or: [{ email }, { username }] });
  if (existingUser) {
    logger.warn("user already exists");
    throw new APIError("user already error", 400);
  }
  const user = new UserModel({ username, email, password });
  await user.save();

  if (!user._id) {
    throw new APIError("Cannot generate token without user id", 500);
  }

  logger.warn("User saved successfully", user._id);
  const { accessToken, refreshToken } = await generateToken(user);
  return res.status(201).json({
    success: true,
    message: "user registraion successfull",
    accessToken,
    refreshToken,
  });
}

export { registrationUser };
