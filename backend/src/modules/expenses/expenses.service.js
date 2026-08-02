import expensesRepository from "./expenses.repository.js";
import generateExpenseNumber from "../../utils/generateExpenseNumber.js";
import ApiError from "../../utils/ApiError.js";
import {
  HTTP_STATUS,
  EXPENSE_STATUS,
} from "../../utils/constants.js";

const expensesService = {
  async createExpense(expenseData, currentUser) {
    // Check category
    const category =
      await expensesRepository.findCategory(
        expenseData.categoryId
      );

    if (!category) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Category not found."
      );
    }

    // Category active?
    if (!category.isActive) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Category is inactive."
      );
    }

    // Calculate total
    const totalAmount =
      Number(expenseData.amount) +
      Number(expenseData.tax);

    // Generate expense number
    const expenseNumber =
      generateExpenseNumber();

    // Prepare data
    const newExpense = {
      ...expenseData,
      employeeId: currentUser.id,
      expenseNumber,
      totalAmount,
      status: EXPENSE_STATUS.DRAFT,
    };

    return expensesRepository.createExpense(
      newExpense
    );
  },
  async getEmployeeExpenses(employeeId) {
  const expenses =
    await expensesRepository.findExpensesByEmployee(
      employeeId
    );

  return expenses;
},
async getExpenseById(expenseId, employeeId) {
  // Find expense
  const expense =
    await expensesRepository.findExpenseById(expenseId);

  // Expense doesn't exist
  if (!expense) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      "Expense not found."
    );
  }

  // Employee doesn't own it
  if (expense.employeeId !== employeeId) {
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN,
      "You are not allowed to view this expense."
    );
  }

  return expense;
},
async updateExpense(expenseId, expenseData, employeeId) {
  // Find expense
  const expense =
    await expensesRepository.findExpenseById(expenseId);

  if (!expense) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      "Expense not found."
    );
  }

  // Ownership check
  if (expense.employeeId !== employeeId) {
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN,
      "You are not allowed to update this expense."
    );
  }

  // Only draft can be edited
  if (expense.status !== EXPENSE_STATUS.DRAFT) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "Only draft expenses can be edited."
    );
  }

  // Category validation
  const category =
    await expensesRepository.findCategory(
      expenseData.categoryId
    );

  if (!category) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      "Category not found."
    );
  }

  if (!category.isActive) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "Category is inactive."
    );
  }

  // Recalculate total
  const totalAmount =
    Number(expenseData.amount) +
    Number(expenseData.tax);

  const updatedExpense =
    await expensesRepository.updateExpense(
      expenseId,
      {
        ...expenseData,
        totalAmount,
      }
    );

  return updatedExpense;
},
async submitExpense(expenseId, employeeId) {
  // Find expense
  const expense = await expensesRepository.findExpenseById(
    expenseId
  );

  if (!expense) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      "Expense not found."
    );
  }

  // Ownership check
  if (expense.employeeId !== employeeId) {
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN,
      "You are not allowed to submit this expense."
    );
  }

  // Only drafts can be submitted
  if (expense.status !== EXPENSE_STATUS.DRAFT) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "Only draft expenses can be submitted."
    );
  }

  // Submit expense
  const submittedExpense =
    await expensesRepository.updateExpense(
      expenseId,
      {
        status: EXPENSE_STATUS.SUBMITTED,
        submittedAt: new Date(),
      }
    );

  return submittedExpense;
},
};

export default expensesService;