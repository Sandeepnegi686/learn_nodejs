import jwt from "jsonwebtoken";
import crypto from "crypto";
import RefreshToken from "../Model/RefreshToken";

const JWT_SECRET = process.env.JWT_SECRET || "";

export type UserType = {
  username: string;
  email: string;
  _id?: string;
  password?: string;
};

async function generateToken(user: UserType) {
  const accessToken = jwt.sign(
    { userId: user._id, username: user.username },
    JWT_SECRET,
    { expiresIn: "7d" },
  );
  const refreshToken = crypto.randomBytes(30).toString("hex");
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await RefreshToken.create({
    token: refreshToken,
    user: user._id,
    expiresAt: expiresAt,
  });

  return { accessToken, refreshToken };
}

export { generateToken };
