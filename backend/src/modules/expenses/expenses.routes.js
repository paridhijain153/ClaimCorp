import { Router } from "express";

import expensesController from "./expenses.controller.js";
import {
  createExpenseSchema,
    updateExpenseSchema
} from "./expenses.validation.js";

import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";
import validate from "../../middleware/validate.js";

import { ROLES } from "../../utils/constants.js";

const router = Router();
router.get("/",
  authenticate,
  authorize(ROLES.EMPLOYEE),
  expensesController.getEmployeeExpenses
);
router.get("/:id",
  authenticate,
  authorize(ROLES.EMPLOYEE),
  expensesController.getExpenseById
);
router.post(
  "/",
  authenticate,
  authorize(ROLES.EMPLOYEE),
  validate(createExpenseSchema),
  expensesController.createExpense
);
router.patch(
  "/:id",
  authenticate,
  authorize(ROLES.EMPLOYEE),
  validate(updateExpenseSchema),
  expensesController.updateExpense
);
router.patch(
  "/:id/autofill",
  authenticate,
  authorize(ROLES.EMPLOYEE),
  expensesController.autofillExpense
);
router.patch(
  "/:id/submit",
  authenticate,
  authorize(ROLES.EMPLOYEE),
  expensesController.submitExpense
);
export default router;