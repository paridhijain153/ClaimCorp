import { Router } from "express";

import categoriesController from "./categories.controller.js";

import { createCategorySchema , updateCategoryStatusSchema } from "./categories.validation.js";

import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";
import validate from "../../middleware/validate.js";

import { ROLES } from "../../utils/constants.js";

const router = Router();
router.get(
  "/",
  authenticate,
  authorize(
    ROLES.ADMIN,
    ROLES.EMPLOYEE
  ),
  categoriesController.getAllCategories
);
router.post(
  "/",
  authenticate,
  authorize(ROLES.ADMIN),
  validate(createCategorySchema),
  categoriesController.createCategory
);
router.patch(
  "/:id/status",
  authenticate,
  authorize(ROLES.ADMIN),
  validate(updateCategoryStatusSchema),
  categoriesController.updateCategoryStatus
);
export default router;