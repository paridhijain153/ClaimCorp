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
};

export default usersController;