import prisma from "../../config/prisma.js";
const expenseInclude = {
  employee: {
    select: {
      id: true,
      name: true,
      email: true,
      managerId: true,
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

const expensesRepository = {
  createExpense(data) {
    return prisma.expense.create({
      data,
      include: expenseInclude,
    });
  },

  findExpenseById(id) {
    return prisma.expense.findUnique({
      where: { id },
      include: expenseInclude,
    });
  },

  findCategory(id) {
    return prisma.category.findUnique({
      where: { id },
    });
  },

  findExpensesByEmployee(employeeId) {
    return prisma.expense.findMany({
      where: {
        employeeId,
      },
      include: expenseInclude,
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  updateExpense(id, data) {
    return prisma.expense.update({
      where: {
        id,
      },
      data,
      include: expenseInclude,
    });
  },
  findLatestReceipt(expenseId) {
  return prisma.receipt.findFirst({
    where: {
      expenseId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
},
};

export default expensesRepository;