import { NextFunction, Request, Response } from "express";

import UserModel from "../Model/User";
import RefreshTokenModel from "../Model/RefreshToken";
import logger from "../utils/logger";
import { validateRegistration, validateLogin } from "../utils/validation";
import { APIError } from "../middleware/errorHandler";
import { generateToken } from "../utils/generateToken";
import { argon2 } from "node:crypto";

type RegistrationRequestBodyType = {
  username: string;
  email: string;
  password: string;
};
type LoginRequestBodyType = {
  username: string;
  email: string;
  password: string;
};

//Registration
async function registrationUser(
  req: Request<{}, {}, RegistrationRequestBodyType>,
  res: Response,
) {
  logger.info("user registration start");
  const { error } = validateRegistration(req.body);
  if (error) {
    const errMsg = error?.details[0]?.message;
    throw new APIError(errMsg, 400);
  }
  const { email, username, password } = req.body;
  const existingUser = await UserModel.find({ $or: [{ email }, { username }] });
  if (existingUser.length) {
    logger.warn("user already exists");
    throw new APIError("user already error", 400);
  }
  const user = new UserModel({ username, email, password });
  await user.save();

  if (!user._id) {
    throw new APIError("Cannot generate token without user id", 500);
  }

  logger.warn("User saved successfully", user._id);
  const { accessToken, refreshToken } = await generateToken(user as any);
  return res.status(201).json({
    success: true,
    message: "user registraion successfull",
    accessToken,
    refreshToken,
  });
}

//Login
async function loginUser(
  req: Request<{}, {}, LoginRequestBodyType>,
  res: Response,
) {
  logger.info("login endpoint hit");

  const { error } = validateLogin(req.body);
  if (error) {
    const errMsg = error?.details[0]?.message;
    throw new APIError(errMsg, 400);
  }
  const { email, password } = req.body;
  const existingUser = await UserModel.findOne({ email }).select("+password");
  if (!existingUser) {
    throw new APIError("user not found", 400);
  }
  // const isValidPassword = await existingUser.comparePassword(password);

  // if (!isValidPassword) {
  //   throw new APIError("password incorrect", 400);
  // }

  // const { accessToken, refreshToken } = await generateToken(user);
  // return res
  //   .status(200)
  //   .json({ success: true, accessToken, refreshToken, user: existingUser });
  // const passTrue = await argon2.verify(existingUser.password, password);
  // if (passTrue) {
  // }
  // console.log(existingUser);
  // if()
  // if (await argon2.verify("<big long hash>", "password")) {
  // }
  return res.status(200).json({ success: true, data: existingUser });
  // const const
}

export { registrationUser, loginUser };
