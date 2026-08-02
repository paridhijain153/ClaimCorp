import prisma from "../../config/prisma.js";

const receiptInclude = {
  expense: {
    select: {
      id: true,
      expenseNumber: true,
      status: true,
    },
  },
};

const receiptsRepository = {
  createReceipt(data) {
    return prisma.receipt.create({
      data,
      include: receiptInclude,
    });
  },

  findReceiptById(id) {
    return prisma.receipt.findUnique({
      where: {
        id,
      },
      include: {
        expense: {
          include: {
            employee: {
              select: {
                id: true,
                managerId: true,
              },
            },
          },
        },
      },
    });
  },

  findReceiptsByExpense(expenseId) {
    return prisma.receipt.findMany({
      where: {
        expenseId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  },

  deleteReceipt(id) {
    return prisma.receipt.delete({
      where: {
        id,
      },
    });
  },
};

export default receiptsRepository;