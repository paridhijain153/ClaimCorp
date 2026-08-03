import { hashPassword, comparePassword } from "../../utils/hashPassword.js";
import { generateToken } from "../../utils/jwt.js";
import ApiError from "../../utils/ApiError.js";
import { HTTP_STATUS, ROLES } from "../../utils/constants.js";
import userRepository from "../users/users.repository.js";
const authService = {
  async registerUser(userData) {
    const existingUser = await userRepository.findUserByEmail(
      userData.email
    );

    if (existingUser) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        "Email already exists."
      );
    }

    if (userData.role === ROLES.EMPLOYEE) {
      const manager = await userRepository.findManager(
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

const createdUser =
  await userRepository.createUser(newUser);

const {
  password,
  ...safeUser
} = createdUser;

return safeUser;
  },

async loginUser(email, password) {
  const user = await userRepository.findUserByEmail(email);

  if (!user) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      "Invalid email or password"
    );
  }

  if (!user.isActive) {
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN,
      "Your account is inactive."
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

  const accessToken = generateToken({
    id: user.id,
    role: user.role,
  });

  const { password: _, ...safeUser } = user;

  return {
    accessToken,
    user: safeUser,
  };
}
};
export default authService;