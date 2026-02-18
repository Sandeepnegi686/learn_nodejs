import { Request, Response } from "express";
import { APIError } from "../middleware/errorHandler";
import logger from "../utils/logger";
import SearchModel from "../Models/SearchModel";

async function searchPostController(
  req: Request<{}, {}, {}, { search: string }>,
  res: Response,
) {
  logger.info(`Search endpoint hit!`);
  try {
    const { search } = req.query;
    const result = await SearchModel.find(
      {
        $text: { $search: search },
      },
      {
        score: { $meta: "textScore" },
      },
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(10);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    throw new APIError("server error", 500);
  }
}

export { searchPostController };
