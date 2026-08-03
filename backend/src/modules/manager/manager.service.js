import expensesRepository from "../expenses/expenses.repository.js";
import ApiError from "../../utils/ApiError.js";
import { HTTP_STATUS } from "../../utils/constants.js";
import { EXPENSE_STATUS } from "../../utils/constants.js";
import managerRepository from "./manager.repository.js";

const managerService = {
  async getSubmittedExpenses(managerId) {
    return managerRepository.findSubmittedExpensesByManager(managerId);
  },

  async getExpenseById(expenseId, managerId) {
    const expense = await expensesRepository.findExpenseById(expenseId);

    if (!expense) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Expense not found."
      );
    }

    if (expense.employee.managerId !== managerId) {
      throw new ApiError(
        HTTP_STATUS.FORBIDDEN,
        "You are not allowed to view this expense."
      );
    }

    return expense;
  },
  async approveExpense(expenseId, managerId) {
  const expense =
    await expensesRepository.findExpenseById(expenseId);

  if (!expense) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      "Expense not found."
    );
  }

  // Manager ownership
  if (expense.employee.managerId !== managerId) {
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN,
      "You are not allowed to approve this expense."
    );
  }

  // Must be submitted
  if (expense.status !== EXPENSE_STATUS.SUBMITTED) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "Only submitted expenses can be approved."
    );
  }

  const approvedExpense =
    await expensesRepository.updateExpense(
      expenseId,
      {
        status: EXPENSE_STATUS.APPROVED,
        approvedById: managerId,
        approvedAt: new Date(),
      }
    );

  return approvedExpense;
},
async rejectExpense(expenseId, managerId, managerComment) {
  const expense =
    await expensesRepository.findExpenseById(expenseId);

  if (!expense) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      "Expense not found."
    );
  }

  if (expense.employee.managerId !== managerId) {
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN,
      "You are not allowed to reject this expense."
    );
  }

  if (expense.status !== EXPENSE_STATUS.SUBMITTED) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "Only submitted expenses can be rejected."
    );
  }

  const rejectedExpense =
    await expensesRepository.updateExpense(
      expenseId,
      {
        status: EXPENSE_STATUS.REJECTED,
        approvedById: managerId,
        approvedAt: new Date(),
        managerComment,
      }
    );

  return rejectedExpense;
},
async getDashboardStats(managerId) {
  return managerRepository.getDashboardStats(
    managerId
  );
},
async getCategoryAnalytics(managerId) {
  return managerRepository.getCategoryAnalytics(
    managerId
  );
},
};

export default managerService;