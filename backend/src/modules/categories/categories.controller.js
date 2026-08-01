import categoriesService from "./categories.service.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { HTTP_STATUS } from "../../utils/constants.js";

const categoriesController = {
  createCategory: asyncHandler(async (req, res) => {
    const category = await categoriesService.createCategory(
      req.body
    );

    return res
      .status(HTTP_STATUS.CREATED)
      .json(
        new ApiResponse(
          SUCCESS_MESSAGES.CATEGORY_CREATED,
          category
        )
      );
  }),
};

export default categoriesController;