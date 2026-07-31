import authRepository from "./auth.repository.js";
import { hashPassword, comparePassword } from "../../utils/hashPassword.js";
import { generateToken } from "../../utils/jwt.js";
import ApiError from "../../utils/ApiError.js";
import { HTTP_STATUS, ROLES } from "../../utils/constants.js";

const authService = {
  async registerUser(userData) {
    const existingUser = await authRepository.findUserByEmail(
      userData.email
    );

    if (existingUser) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        "Email already exists."
      );
    }

    if (userData.role === ROLES.EMPLOYEE) {
      const manager = await authRepository.findManager(
        userData.managerId
      );

      if (!manager) {
        throw new ApiError(
          HTTP_STATUS.BAD_REQUEST,
          "Invalid manager."
        );
      }
    }

    const hashedPassword = await hashPassword(userData.password);

    const newUser = {
      ...userData,
      password: hashedPassword,
    };

    const createdUser = await authRepository.createUser(newUser);

    delete createdUser.password;

    return createdUser;
  },

  async loginUser(email, password) {
    const user = await authRepository.findUserByEmail(email);

    if (!user) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        "Invalid email or password"
      );
    }

    const isPasswordCorrect = await comparePassword(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        "Invalid email or password"
      );
    }

    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    delete user.password;

    return {
      user,
      token,
    };
  },
};

export default authService;