import prisma from "../../config/prisma.js";

const categoriesRepository = {
  createCategory(data) {
    return prisma.category.create({
      data,
    });
  },

  findCategoryById(id) {
    return prisma.category.findUnique({
      where: {
        id,
      },
    });
  },

  findCategoryByName(name) {
    return prisma.category.findUnique({
      where: {
        name,
      },
    });
  },

  findAllCategories() {
    return prisma.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  updateCategory(id, data) {
    return prisma.category.update({
      where: {
        id,
      },
      data,
    });
  },

  deleteCategory(id) {
    return prisma.category.delete({
      where: {
        id,
      },
    });
  },
};

export default categoriesRepository;