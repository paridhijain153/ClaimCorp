import { Router } from "express";

import managerController from "./manager.controller.js";

import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";

import { ROLES } from "../../utils/constants.js";
import {rejectExpenseSchema} from "./manager.validation.js";
import validate from "../../middleware/validate.js";

const router = Router();
router.get(
  "/dashboard",
  authenticate,
  authorize(ROLES.MANAGER),
  managerController.getDashboardStats
);
router.get(
  "/expenses",
  authenticate,
  authorize(ROLES.MANAGER),
  managerController.getSubmittedExpenses
);
router.patch(
  "/expenses/:id/approve",
  authenticate,
  authorize(ROLES.MANAGER),
  managerController.approveExpense
);
router.patch(
  "/expenses/:id/reject",
  authenticate,
  authorize(ROLES.MANAGER),
  validate(rejectExpenseSchema),
  managerController.rejectExpense
);
router.get(
  "/expenses/:id",
  authenticate,
  authorize(ROLES.MANAGER),
  managerController.getExpenseById
);


export default router;