import prisma from "../../config/prisma.js";

const authRepository = {

    async findUserByEmail(email) {
        return await prisma.user.findUnique({
            where: {
                email,
            },
        });
    },

    async findUserById(id) {
        return await prisma.user.findUnique({
            where: {
                id,
            },
        });
    },

    async createUser(data) {
        return await prisma.user.create({
            data,
        });
    },

    async updateUser(id, data) {
        return await prisma.user.update({
            where: {
                id,
            },
            data,
        });
    },

    async findManager(id) {
        return await prisma.user.findFirst({
            where: {
                id,
                role: ROLE.MANAGER,
                isActive: true,
            },
        });
    },
};

export default authRepository;