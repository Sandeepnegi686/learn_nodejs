import { APIError } from "../middleware/errorHandler";
import PostModel from "../models/Post";
import { Request, Response } from "express";
import logger from "../utils/logger";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string;
        username?: string;
      };
    }
  }
}

type CreatePostType = { content: string; mediaIds?: string[] };
async function createPost(req: Request<{}, {}, CreatePostType>, res: Response) {
  const content = req?.body?.content;
  const mediaIds = req?.body?.mediaIds;
  if (!content) throw new APIError("Content is not provided", 400);
  const user = req.user as any;
  if (!user.userId) throw new APIError("user is missing", 400);
  //   const user = req.user.userId as string;

  const newlyCreatedPost = new PostModel({
    content,
    mediaIds,
    user: user.userId,
  });
  await newlyCreatedPost.save();
  logger.info("post created successfully");
  return res
    .status(201)
    .json({ success: true, message: "post created successfully" });
}

export { createPost };
