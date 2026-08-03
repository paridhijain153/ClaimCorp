import prisma from "../../config/prisma.js";
import {
  EXPENSE_STATUS,
  ROLES,
} from "../../utils/constants.js";

const analyticsRepository = {
  async getCategoryAnalytics(user) {
    const where = {
      status: EXPENSE_STATUS.APPROVED,
    };

    // Managers can only see analytics for their own employees
    if (user.role === ROLES.MANAGER) {
      where.employee = {
        managerId: user.id,
      };
    }

    const analytics = await prisma.expense.groupBy({
      by: ["categoryId"],

      where,

      _count: {
        id: true,
      },

      _sum: {
        totalAmount: true,
      },
    });

    const categories = await prisma.category.findMany({
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
        totalAmount: item._sum.totalAmount ?? 0,
      };
    });
  },
  async getMonthlyAnalytics(user) {
  const where = {
    status: EXPENSE_STATUS.APPROVED,
  };

  if (user.role === ROLES.MANAGER) {
    where.employee = {
      managerId: user.id,
    };
  }

  const expenses = await prisma.expense.findMany({
    where,

    select: {
      expenseDate: true,
      totalAmount: true,
    },

    orderBy: {
      expenseDate: "asc",
    },
  });

  const monthlyData = {};

  for (const expense of expenses) {
    const month = expense.expenseDate
      .toISOString()
      .slice(0, 7); // YYYY-MM

    if (!monthlyData[month]) {
      monthlyData[month] = {
        month,
        expenseCount: 0,
        totalAmount: 0,
      };
    }

    monthlyData[month].expenseCount++;

    monthlyData[month].totalAmount += Number(
      expense.totalAmount
    );
  }

  return Object.values(monthlyData);
},
async getEmployeeAnalytics(user) {
  const where = {
    status: EXPENSE_STATUS.APPROVED,
  };

  if (user.role === ROLES.MANAGER) {
    where.employee = {
      managerId: user.id,
    };
  }

  const analytics = await prisma.expense.groupBy({
    by: ["employeeId"],

    where,

    _count: {
      id: true,
    },

    _sum: {
      totalAmount: true,
    },

    orderBy: {
      _sum: {
        totalAmount: "desc",
      },
    },
  });

  const employees = await prisma.user.findMany({
    where: {
      role: ROLES.EMPLOYEE,
    },

    select: {
      id: true,
      name: true,
    },
  });

  return analytics.map((item) => {
    const employee = employees.find(
      (e) => e.id === item.employeeId
    );

    return {
      employeeId: item.employeeId,
      employeeName: employee?.name ?? "Unknown",
      expenseCount: item._count.id,
      totalAmount: item._sum.totalAmount ?? 0,
    };
  });
},
};

export default analyticsRepository;