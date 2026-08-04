import { Router } from "express";

import usersController from "./users.controller.js";

import { createUserSchema , updateUserStatusSchema , resetPasswordSchema} from "./users.validation.js";

import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";
import validate from "../../middleware/validate.js";
import { ROLES } from "../../utils/constants.js";

const router = Router();
router.get(
  "/",
  authenticate,
  authorize(ROLES.ADMIN),
  usersController.getAllUsers
);
router.post(
  "/",
  authenticate,
  authorize(ROLES.ADMIN),
  validate(createUserSchema),
  usersController.createUser
);
router.patch(
  "/:id/status",
  authenticate,
  authorize(ROLES.ADMIN),
  validate(updateUserStatusSchema),
  usersController.updateUserStatus
);
router.patch(
  "/:id/reset-password",
  authenticate,
  authorize(ROLES.ADMIN),
  validate(resetPasswordSchema),
  usersController.resetUserPassword
);
export default router;