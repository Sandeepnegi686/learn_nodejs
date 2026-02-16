import express from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  getPost,
} from "../controller/postController";
import asyncHandler from "../middleware/asyncHandler";

const router = express.Router();

router.post("/create", asyncHandler(createPost));
router.get("/get_all_post", getAllPost);
router.get("/get_all_post/:postId", getPost);
router.delete("/delete/:postId", deletePost);

export default router;
