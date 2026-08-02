import receiptsService from "./receipts.service.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { HTTP_STATUS } from "../../utils/constants.js";
import { ROLES } from "../../utils/constants.js";

const receiptsController = {
  uploadReceipt: asyncHandler(async (req, res) => {
    const receipt =
      await receiptsService.uploadReceipt(
        req.params.id,
        req.user.id,
        req.file
      );

    return res.status(HTTP_STATUS.CREATED).json(
      new ApiResponse(
        "Receipt uploaded successfully.",
        receipt
      )
    );
  }),
};

export default receiptsController;