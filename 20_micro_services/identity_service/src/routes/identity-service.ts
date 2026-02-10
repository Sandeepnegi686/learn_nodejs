import express from "express";
import asyncHandler from "../middleware/asyncHandler";
import { loginUser, registrationUser } from "../controller/identityController";
const router = express.Router();

router.post("/register", asyncHandler(registrationUser));
router.post("/login", asyncHandler(loginUser));

export default router;
