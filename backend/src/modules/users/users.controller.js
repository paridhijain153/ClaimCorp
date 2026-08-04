import usersService from "./users.service.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { HTTP_STATUS } from "../../utils/constants.js";

const usersController = {
  createUser: asyncHandler(async (req, res) => {
    const user = await usersService.createUser(req.body);

    return res.status(HTTP_STATUS.CREATED).json(
      new ApiResponse(
        "User created successfully.",
        user
      )
    );
  }),
  getAllUsers: asyncHandler(async (req, res) => {
  const users = await usersService.getAllUsers();

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      "Users fetched successfully.",
      users
    )
  );
}),
updateUserStatus: asyncHandler(async (req, res) => {
  const user =
    await usersService.updateUserStatus(
      req.params.id,
      req.user.id,
      req.body.isActive
    );

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      "User status updated successfully.",
      user
    )
  );
}),
resetUserPassword: asyncHandler(async (req, res) => {
  const user =
    await usersService.resetUserPassword(
      req.params.id,
      req.body.newPassword
    );

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      "Password reset successfully.",
      user
    )
  );
}),
};

export default usersController;