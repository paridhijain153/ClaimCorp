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
};

export default usersRepository;