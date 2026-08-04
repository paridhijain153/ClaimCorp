import { Router } from "express";

import analyticsController from "./analytics.controller.js";

import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";

import { ROLES } from "../../utils/constants.js";

const router = Router();
router.get(
  "/dashboard",
  authenticate,
  authorize(ROLES.ADMIN),
  analyticsController.getDashboard
);
router.get(
  "/categories",
  authenticate,
  authorize(
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  analyticsController.getCategoryAnalytics
);
router.get(
  "/monthly",
  authenticate,
  authorize(
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  analyticsController.getMonthlyAnalytics
);
router.get(
  "/employees",
  authenticate,
  authorize(
    ROLES.ADMIN,
    ROLES.MANAGER
  ),
  analyticsController.getEmployeeAnalytics
);

export default router;