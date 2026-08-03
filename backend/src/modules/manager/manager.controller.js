import managerService from "./manager.service.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { HTTP_STATUS } from "../../utils/constants.js";

const managerController = {
  getSubmittedExpenses: asyncHandler(async (req, res) => {
    const expenses =
      await managerService.getSubmittedExpenses(
        req.user.id
      );

    return res.status(HTTP_STATUS.OK).json(
      new ApiResponse(
        "Submitted expenses fetched successfully.",
        expenses
      )
    );
  }),
  getExpenseById: asyncHandler(async (req, res) => {
  const expense = await managerService.getExpenseById(
    req.params.id,
    req.user.id
  );

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      "Expense fetched successfully.",
      expense
    )
  );
}),
approveExpense: asyncHandler(async (req, res) => {
  const expense =
    await managerService.approveExpense(
      req.params.id,
      req.user.id
    );

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      "Expense approved successfully.",
      expense
    )
  );
}),
rejectExpense: asyncHandler(async (req, res) => {
  const expense =
    await managerService.rejectExpense(
      req.params.id,
      req.user.id,
      req.body.managerComment
    );

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      "Expense rejected successfully.",
      expense
    )
  );
}),
async getDashboardStats(req, res) {
  const dashboard =
    await managerService.getDashboardStats(
      req.user.id
    );

  res.status(200).json(
    new ApiResponse(
      "Dashboard fetched successfully.",
      dashboard
    )
  );
},
};

export default managerController;