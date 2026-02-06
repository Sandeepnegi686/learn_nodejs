import { NextFunction, Request, Response } from "express";
import RefreshTokenModel from "../Model/RefreshToken";
import logger from "../utils/logger";
import { validateRegistration } from "../utils/validation";
import { APIError } from "../middleware/errorHandler";

type RegistrationRequestBodyType = {
  username: string;
  email: string;
  password: string;
};

//Registration
function registrationUser(
  req: Request<{}, {}, RegistrationRequestBodyType>,
  res: Response,
  next: NextFunction,
) {
  logger.info("user registration start");
  if (!validateRegistration(req.body))
    throw new APIError("required all fields", 400);
}

export { registrationUser };
