import { Router } from "express";

import authController from "./auth.controller.js";

import validate from "../../middleware/validate.js";

import {
  loginSchema,
  createUserSchema,
} from "./auth.validation.js";

const router = Router();

router.post(
  "/register",
  validate(createUserSchema),
  authController.registerUser
);

router.post(
  "/login",
  validate(loginSchema),
  authController.loginUser
);

export default router;