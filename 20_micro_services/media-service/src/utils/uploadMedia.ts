import express, { Express, NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import logger from "./logger";
import { UploadApiResponse } from "cloudinary";

function uploadMediaToCloudinary(
  file: Express.Multer.File,
): Promise<UploadApiResponse> {
  return new Promise((res, rej) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (err, result) => {
        if (err) {
          logger.error(err.message);
          rej(err);
        }
        if (!result) {
          logger.error("Upload failed");
          return rej(new Error("Upload failed"));
        }
        logger.info("image uploaded");
        res(result);
      },
    );
    uploadStream.end(file.buffer);
  });
}

export { uploadMediaToCloudinary };
