import { Router } from "express";
import ApiResponse from "../utils/ApiResponse.js";
import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/users/users.routes.js";
import categoryRoutes from "../modules/categories/categories.routes.js";
import expenseRoutes from "../modules/expenses/expenses.routes.js";
import managerRoutes from "../modules/manager/manager.routes.js";
import receiptsRoutes from "../modules/receipts/receipts.routes.js";

const router = Router();
router.get("/", (req, res) => {
  res.status(200).json(
    new ApiResponse(
      "ClaimCorp API is running"
    )
  );
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/expenses", expenseRoutes);
router.use("/manager", managerRoutes);
router.use("/receipts", receiptsRoutes);

export default router;