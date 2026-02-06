import express from "express";
import asyncHandler from "../middleware/asyncHandler";
import { registrationUser } from "../controller/identityController";
const router = express.Router();

router.post("/register", asyncHandler(registrationUser));

export default router;
