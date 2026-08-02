import prisma from "../../config/prisma.js";
import { EXPENSE_STATUS } from "../../utils/constants.js";

const expenseInclude = {
  employee: {
    select: {
      id: true,
      name: true,
      email: true,
      department: true,
      designation: true,
    },
  },
  category: {
    select: {
      id: true,
      name: true,
    },
  },
  receipts: true,
};

const managerRepository = {
  findSubmittedExpensesByManager(managerId) {
    return prisma.expense.findMany({
      where: {
        status: EXPENSE_STATUS.SUBMITTED,
        employee: {
          managerId,
        },
      },
      include: expenseInclude,
      orderBy: {
        submittedAt: "desc",
      },
    });
  },
};

export default managerRepository;