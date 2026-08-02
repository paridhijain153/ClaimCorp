import expensesService from "./expenses.service.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { HTTP_STATUS } from "../../utils/constants.js";

const expensesController = {
  createExpense: asyncHandler(async (req, res) => {
    const expense = await expensesService.createExpense(
      req.body,
      req.user
    );

    return res.status(HTTP_STATUS.CREATED).json(
      new ApiResponse(
        "Expense created successfully.",
        expense
      )
    );
  }),
  getEmployeeExpenses: asyncHandler(async (req, res) => {
  const expenses = await expensesService.getEmployeeExpenses(
    req.user.id
  );

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      "Expenses fetched successfully.",
      expenses
    )
  );
}),
getExpenseById: asyncHandler(async (req, res) => {
  const expense =
    await expensesService.getExpenseById(
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
updateExpense: asyncHandler(async (req, res) => {
  const expense =
    await expensesService.updateExpense(
      req.params.id,
      req.body,
      req.user.id
    );

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      "Expense updated successfully.",
      expense
    )
  );
}),
submitExpense: asyncHandler(async (req, res) => {
  const expense =
    await expensesService.submitExpense(
      req.params.id,
      req.user.id
    );

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      "Expense submitted successfully.",
      expense
    )
  );
}),
};

export default expensesController;