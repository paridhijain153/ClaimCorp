import prisma from "../../config/prisma.js";
import { ROLES } from "../../utils/constants.js";

const usersRepository = {
  findUserByEmail(email) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  },

  findUserById(id) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  },

  createUser(data) {
    return prisma.user.create({
      data,
    });
  },

  updateUser(id, data) {
    return prisma.user.update({
      where: {
        id,
      },
      data,
    });
  },

  findManager(id) {
    return prisma.user.findFirst({
      where: {
        id,
        role: ROLES.MANAGER,
        isActive: true,
      },
    });
  },
  findAllUsers() {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      department: true,
      designation: true,
      isActive: true,
      managerId: true,
      createdAt: true,
    },
  });
},
updateUserPassword(id, password) {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      password,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
},
};

export default usersRepository;