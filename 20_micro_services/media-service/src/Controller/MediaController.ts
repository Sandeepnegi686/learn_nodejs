import { Request, Response } from "express";
import MediaModel from "../Model/MediaModel";
import logger from "../utils/logger";
import { APIError } from "../middleware/errorHandler";
import { uploadMediaToCloudinary } from "../utils/uploadMedia";

async function uploadMedia(req: Request, res: Response) {
  logger.info("Starting media upload");
  try {
    if (!req.file) {
      logger.error("no file present");
      throw new APIError("File not received", 400);
    }
    const { originalname, mimetype, buffer } = req.file;
    const userId = req.user?.userId;
    console.log(originalname, mimetype, buffer, userId);
    const cloudinaryUploadResult = await uploadMediaToCloudinary(req.file);
    logger.info(
      `cloudinary upload successfull. Public : ${cloudinaryUploadResult.public_id}`,
    );
    const newlyCreatedMedia = new MediaModel({
      publicId: cloudinaryUploadResult.public_id,
      originalName: originalname,
      mimeType: mimetype,
      url: cloudinaryUploadResult.secure_url,
      userId,
    });
    await newlyCreatedMedia.save();
    return res.status(201).json({
      success: true,
      mediaId: newlyCreatedMedia._id,
      url: newlyCreatedMedia.url,
      message: "Media upload is successful.",
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
      throw new APIError("Something went wrong", 500);
    }
  }
}

async function getAllMedia(req: Request, res: Response) {
  const media = await MediaModel.find();
  return res.status(200).json({ success: true, data: media });
}

export { uploadMedia, getAllMedia };
