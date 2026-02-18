import { APIError } from "../middleware/errorHandler";
import SearchModel from "../Models/SearchModel";
import logger from "../utils/logger";

async function handlePostCreated(event: string) {
  try {
    const { postId, userId, createdAt, content } = JSON.parse(event);
    console.log(JSON.parse(JSON.parse(event)));
    const newSearchPost = new SearchModel({
      postId,
      userId,
      createdAt,
      content,
    });
    await newSearchPost.save();
    logger.info(
      `Search post Created: ${postId}, searchPostId: ${newSearchPost._id}`,
    );
  } catch (error) {
    if (error instanceof Error) logger.error(error.message as string);
    throw new APIError("something went wrong while creating search post", 500);
  }
}

export { handlePostCreated };
