import { Router } from "express";

import usersController from "./users.controller.js";

import { createUserSchema } from "./users.validation.js";

import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";
import validate from "../../middleware/validate.js";

import { ROLES } from "../../utils/constants.js";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize(ROLES.ADMIN),
  validate(createUserSchema),
  usersController.createUser
);

export default router;