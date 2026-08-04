import usersRepository from "./users.repository.js";
import { hashPassword } from "../../utils/hashPassword.js";
import ApiError from "../../utils/ApiError.js";
import { HTTP_STATUS, ROLES } from "../../utils/constants.js";

const usersService = {
  async createUser(userData) {
    // Check if email already exists
    const existingUser = await usersRepository.findUserByEmail(
      userData.email
    );

    if (existingUser) {
      throw new ApiError(
        HTTP_STATUS.CONFLICT,
        "Email already exists."
      );
    }
    if (userData.role === ROLES.ADMIN) {
  throw new ApiError(
    HTTP_STATUS.FORBIDDEN,
    "Creating admin users is not allowed."
  );
}
    // Validate manager for employees
    if (userData.role === ROLES.EMPLOYEE) {
      const manager = await usersRepository.findManager(
        userData.managerId
      );

      if (!manager) {
        throw new ApiError(
          HTTP_STATUS.BAD_REQUEST,
          "Invalid manager."
        );
      }
    }

    // Hash password
    const hashedPassword = await hashPassword(
      userData.password
    );

    // Prepare data
    const newUser = {
      ...userData,
      password: hashedPassword,
    };

    // Save user
    const createdUser =
      await usersRepository.createUser(newUser);

    // Remove password from response
    const { password, ...safeUser } = createdUser;

    return safeUser;
  },
  async getAllUsers() {
  return usersRepository.findAllUsers();
},
async updateUserStatus(
  userId,
  currentUserId,
  isActive
) {
  const user =
    await usersRepository.findUserById(userId);

  if (!user) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      "User not found."
    );
  }

  // Admin cannot deactivate themselves
  if (
    user.id === currentUserId &&
    isActive === false
  ) {
    throw new ApiError(
      HTTP_STATUS.BAD_REQUEST,
      "You cannot deactivate your own account."
    );
  }

  const updatedUser =
    await usersRepository.updateUser(userId, {
      isActive,
    });

  const { password, ...safeUser } =
    updatedUser;

  return safeUser;
},
};

export default usersService;