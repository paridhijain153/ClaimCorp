import analyticsService from "./analytics.service.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { HTTP_STATUS } from "../../utils/constants.js";

const analyticsController = {
  getCategoryAnalytics: asyncHandler(async (req, res) => {
    const analytics =
      await analyticsService.getCategoryAnalytics(req.user);

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse(
        "Category analytics fetched successfully.",
        analytics
      )
    );
  }),

  getMonthlyAnalytics: asyncHandler(async (req, res) => {
    const analytics =
      await analyticsService.getMonthlyAnalytics(req.user);

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse(
        "Monthly analytics fetched successfully.",
        analytics
      )
    );
  }),

  getEmployeeAnalytics: asyncHandler(async (req, res) => {
    const analytics =
      await analyticsService.getEmployeeAnalytics(req.user);

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse(
        "Employee analytics fetched successfully.",
        analytics
      )
    );
  }),
  async getDashboard(req, res) {
  const dashboard =
    await analyticsService.getDashboard(
      req.user
    );

  res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      "Dashboard fetched successfully.",
      dashboard
    )
  );
},
};

export default analyticsController;