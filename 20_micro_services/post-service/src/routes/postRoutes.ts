import express from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  getPost,
} from "../controller/postController";

const router = express.Router();

router.post("/create", createPost);
router.get("/get_all_post", getAllPost);
router.get("/get_all_post/:postId", getPost);
router.delete("/delete/:postId", deletePost);

export default router;
