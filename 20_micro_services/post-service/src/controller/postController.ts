import { APIError } from "../middleware/errorHandler";
import PostModel from "../models/Post";
import { Request, Response } from "express";
import logger from "../utils/logger";
import { postValidation } from "../middleware/validation";
import { Types } from "mongoose";

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

async function invalidPostsCache(req: Request) {
  const postKeys = await req.redisClient?.keys("posts:*");
  if (postKeys?.length) {
    await req.redisClient?.del(postKeys);
  }
}

async function invalidPostCache(req: Request) {
  const postKeys = await req.redisClient?.keys("posts:*");
  if (postKeys?.length) {
    await req.redisClient?.del(postKeys);
  }
}

type CreatePostType = { content: string; mediaIds?: string[] };
async function createPost(req: Request<{}, {}, CreatePostType>, res: Response) {
  const content = req?.body?.content;
  const mediaIds = req?.body?.mediaIds;
  const { error } = postValidation(req.body);
  if (error) {
    const errMsg = error?.details[0]?.message;
    throw new APIError(errMsg, 400);
  }
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
  //deleting all the keys/posts from redis
  await invalidPostsCache(req);

  logger.info("post created successfully");
  return res
    .status(201)
    .json({ success: true, message: "post created successfully" });
}

type GetPostQueryType = { page: number; skip: number; limit: number };
async function getAllPost(
  req: Request<{}, {}, {}, GetPostQueryType>,
  res: Response,
) {
  const page = req.query.page || 1;
  const limit = req.query.limit || 2;
  const skip = (page - 1) * limit;

  const cacheKey = `posts:${page}:${limit}`;
  const redispostString = (await req.redisClient?.get(cacheKey)) as string;
  const getRedisPosts = JSON.parse(redispostString);

  if (getRedisPosts) {
    return res.status(200).json({ success: true, data: getRedisPosts });
  }

  const posts = await PostModel.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalPosts = await PostModel.countDocuments();
  const totalPages = Math.ceil(totalPosts / limit);
  const data = { posts, totalPosts, totalPages };

  await req.redisClient?.setex(cacheKey, 300, JSON.stringify(data));
  return res.status(200).json({ success: true, data });
}

async function getPost(
  req: Request<{ postId: Types.ObjectId }>,
  res: Response,
) {
  const postId = req.params.postId;
  if (!postId || !Types.ObjectId.isValid(postId)) {
    throw new APIError("postId is invalid", 400);
  }
  const postCacheKey = `post:${postId}`;
  const redisPost = await req.redisClient?.get(postCacheKey);
  if (redisPost) {
    const post = JSON.parse(redisPost);
    return res.status(200).json({ success: true, data: post });
  }
  const post = await PostModel.findById(postId);
  if (!post) throw new APIError("post not found", 400);
  await req.redisClient?.setex(postCacheKey, 300, JSON.stringify(post));
  return res.status(200).json({ success: true, data: post });
}

async function deletePost(
  req: Request<{ postId: Types.ObjectId }>,
  res: Response,
) {
  const postId = req.params.postId;
  if (!postId || !Types.ObjectId.isValid(postId)) {
    throw new APIError("postId is invalid", 400);
  }
  const post = await PostModel.findByIdAndDelete(postId);
  if (post) {
    await req.redisClient?.del(`post:${postId}`);
    return res.status(200).json({
      success: true,
      message: "Post Deleted Successfully",
      data: post,
    });
  }
  return res.status(404).json({
    success: false,
    message: "Post not found",
    data: post,
  });
}

export { createPost, getAllPost, getPost, deletePost };
