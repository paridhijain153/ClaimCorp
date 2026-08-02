import { Router } from "express";

import receiptsController from "./receipts.controller.js";

import authenticate from "../../middleware/authenticate.js";
import authorize from "../../middleware/authorize.js";
import upload from "../../middleware/upload.js";

import { ROLES } from "../../utils/constants.js";

const router = Router();

router.post(
  "/expenses/:id",
  authenticate,
  authorize(ROLES.EMPLOYEE),
  upload.single("receipt"),
  receiptsController.uploadReceipt
);

export default router;