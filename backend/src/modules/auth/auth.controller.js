import authService from "./auth.service.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { HTTP_STATUS } from "../../utils/constants.js";

const authController = {
  registerUser: asyncHandler(async (req, res) => {
    const user = await authService.registerUser(req.body);

    return res
      .status(HTTP_STATUS.CREATED)
      .json(
        new ApiResponse(
          "User created successfully.",
          user
        )
      );
  }),

  loginUser: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const result = await authService.loginUser(email, password);

    return res
      .status(HTTP_STATUS.OK)
      .json(
        new ApiResponse(
          "Login successful.",
          result
        )
      );
  }),
};

export default authController;