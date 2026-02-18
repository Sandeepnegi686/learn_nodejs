import express from "express";
import { searchPostController } from "../controller/searchPostController";
import authenticateUser from "../middleware/authMiddleware";

const router = express.Router();

router.use(authenticateUser);

router.post("/get", searchPostController);

export default router;
