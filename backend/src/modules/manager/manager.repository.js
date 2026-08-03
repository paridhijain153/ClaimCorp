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
  async getDashboardStats(managerId) {
  const [
    pendingExpenses,
    approvedExpenses,
    rejectedExpenses,
    fraudAlerts,
    pendingAmount,
    approvedAmount,
  ] = await Promise.all([
    prisma.expense.count({
      where: {
        employee: {
          managerId,
        },
        status: EXPENSE_STATUS.SUBMITTED,
      },
    }),

    prisma.expense.count({
      where: {
        employee: {
          managerId,
        },
        status: EXPENSE_STATUS.APPROVED,
      },
    }),

    prisma.expense.count({
      where: {
        employee: {
          managerId,
        },
        status: EXPENSE_STATUS.REJECTED,
      },
    }),

    prisma.receipt.count({
      where: {
        isFraudulent: true,
        expense: {
          employee: {
            managerId,
          },
        },
      },
    }),

    prisma.expense.aggregate({
      where: {
        employee: {
          managerId,
        },
        status: EXPENSE_STATUS.SUBMITTED,
      },
      _sum: {
        totalAmount: true,
      },
    }),

    prisma.expense.aggregate({
      where: {
        employee: {
          managerId,
        },
        status: EXPENSE_STATUS.APPROVED,
      },
      _sum: {
        totalAmount: true,
      },
    }),
  ]);

  return {
    pendingExpenses,
    approvedExpenses,
    rejectedExpenses,
    fraudAlerts,
    pendingAmount:
      pendingAmount._sum.totalAmount || 0,
    approvedAmount:
      approvedAmount._sum.totalAmount || 0,
  };
},
async getCategoryAnalytics(managerId) {
  const analytics = await prisma.expense.groupBy({
    by: ["categoryId"],

    where: {
      employee: {
        managerId,
      },
      status: EXPENSE_STATUS.APPROVED,
    },

    _count: {
      id: true,
    },

    _sum: {
      totalAmount: true,
    },
  });

  const categories =
    await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });

  return analytics.map((item) => {
    const category = categories.find(
      (c) => c.id === item.categoryId
    );

    return {
      category: category?.name ?? "Unknown",

      expenseCount: item._count.id,

      totalAmount:
        item._sum.totalAmount ?? 0,
    };
  });
},
};

export default managerRepository;