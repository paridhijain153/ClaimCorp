import analyticsService from "./analytics.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

const analyticsController = {
  async getCategoryAnalytics(req, res) {
    const analytics =
      await analyticsService.getCategoryAnalytics(req.user);

    res.status(200).json(
      new ApiResponse(
        "Category analytics fetched successfully.",
        analytics
      )
    );
  },
  async getMonthlyAnalytics(req, res) {
  const analytics =
    await analyticsService.getMonthlyAnalytics(
      req.user
    );

  res.status(200).json(
    new ApiResponse(
      "Monthly analytics fetched successfully.",
      analytics
    )
  );
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
async getEmployeeAnalytics(req, res) {
  const analytics =
    await analyticsService.getEmployeeAnalytics(
      req.user
    );

  res.status(200).json(
    new ApiResponse(
      "Employee analytics fetched successfully.",
      analytics
    )
  );
},
};

export default analyticsController;