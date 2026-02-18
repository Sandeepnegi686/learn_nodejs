import { APIError } from "../middleware/errorHandler";
import MediaModel from "../Model/MediaModel";
import logger from "../utils/logger";
import { deleteMediaFromCloudinary } from "../utils/uploadMedia";

async function handlePostDeleted(event: string) {
  const data = JSON.parse(JSON.parse(event.toString()));
  const { postId, mediaIds } = data;
  try {
    const mediaToDelete = await MediaModel.find({ _id: { $in: mediaIds } });
    for (let media of mediaToDelete) {
      await deleteMediaFromCloudinary(media.publicId);
      await MediaModel.findByIdAndDelete(media._id);
      logger.info(
        `Deleted media: ${media._id}, associated with post: ${postId}`,
      );
    }
    logger.info("Processed deletion of media is completed.");
  } catch (error) {
    if (error instanceof Error) logger.error(error.message as string);
    throw new APIError("something went wrong, 'media_deleted'", 500);
  }
}

export default handlePostDeleted;
