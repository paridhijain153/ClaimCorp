import asyncHandler from "../utils/asyncHandler.js";
import { verifyToken } from "../utils/jwt.js";
import ApiError from "../utils/ApiError.js";
import { HTTP_STATUS } from "../utils/constants.js";
import usersRepository from "../modules/users/users.repository.js";

const authenticate = asyncHandler(async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        "Authentication required."
      );
    }

    const token = authHeader.split(" ")[1];

    const payload = verifyToken(token);

    const user = await usersRepository.findUserById(payload.id);

    if (!user) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        "User not found."
      );
    }

    if (!user.isActive) {
      throw new ApiError(
        HTTP_STATUS.FORBIDDEN,
        "Your account is inactive."
      );
    }

    const { password, ...safeUser } = user;

    req.user = safeUser;

    next();
  } catch (error) {
    next(error);
  }
});

export default authenticate;