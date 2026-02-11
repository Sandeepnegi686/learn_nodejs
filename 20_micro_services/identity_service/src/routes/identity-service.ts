import express from "express";
import asyncHandler from "../middleware/asyncHandler";
import {
  loginUser,
  logout,
  refreshToken,
  registrationUser,
} from "../controller/identityController";
const router = express.Router();

router.post("/register", asyncHandler(registrationUser));
router.post("/login", asyncHandler(loginUser));
router.post("/refresh", asyncHandler(refreshToken));
router.post("/logout", asyncHandler(logout));

export default router;
