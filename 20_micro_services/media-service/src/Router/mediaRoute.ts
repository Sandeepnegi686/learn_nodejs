import express, { NextFunction, Request, Response } from "express";
import authenticateUser from "../middleware/authMiddleware";
import upload from "../config/multer";
import multer from "multer";
import logger from "../utils/logger";
import { APIError } from "../middleware/errorHandler";
import { getAllMedia, uploadMedia } from "../Controller/MediaController";

const router = express.Router();

router.post(
  "/upload",
  authenticateUser,
  (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        logger.error(`multer error while uploading: ${err.message}`);
        next(new APIError(err.message, 400));
      } else if (err) {
        logger.error(`error occured while uploading: ${err.message}`);
        next(new APIError(err.message, 500));
      }
      if (!req.file) return next(new APIError("No file uploaded", 400));
      next();
    });
  },
  uploadMedia,
);

router.get("/get-all-media", authenticateUser, getAllMedia);

export default router;
