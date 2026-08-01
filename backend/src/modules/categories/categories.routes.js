import { Router } from "express";

import categoriesController from "./categories.controller.js";

import { createCategorySchema } from "./categories.validation.js";

import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";
import validate from "../../middleware/validate.js";

import { ROLES } from "../../utils/constants.js";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize(ROLES.ADMIN),
  validate(createCategorySchema),
  categoriesController.createCategory
);

export default router;