import asyncHandler from "express-async-handler";
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