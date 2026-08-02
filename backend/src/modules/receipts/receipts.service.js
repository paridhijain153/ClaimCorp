import receiptsRepository from "./receipts.repository.js";
import expensesRepository from "../expenses/expenses.repository.js";
import uploadToCloudinary from "../../utils/uploadToCloudinary.js";

import ApiError from "../../utils/ApiError.js";
import {
  HTTP_STATUS,
  EXPENSE_STATUS,
} from "../../utils/constants.js";
import deleteFromCloudinary from "../../utils/deleteFromCloudinary.js";

const receiptsService = {
  async uploadReceipt(expenseId, employeeId, file) {
    if (!file) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Receipt file is required."
      );
    }

    const expense =
      await expensesRepository.findExpenseById(
        expenseId
      );

    if (!expense) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Expense not found."
      );
    }

    if (expense.employee.id !== employeeId) {
      throw new ApiError(
        HTTP_STATUS.FORBIDDEN,
        "You can upload receipts only to your own expenses."
      );
    }

    if (expense.status !== EXPENSE_STATUS.DRAFT) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Receipts can only be uploaded to draft expenses."
      );
    }

const uploadedFile =
  await uploadToCloudinary(file.buffer);

try {
  const receipt =
    await receiptsRepository.createReceipt({
      expenseId,

      fileName: file.originalname,

      fileUrl: uploadedFile.secure_url,

      cloudinaryPublicId:
        uploadedFile.public_id,

      mimeType: file.mimetype,

      fileSize: file.size,
    });

  return receipt;
} catch (error) {
  await deleteFromCloudinary(
    uploadedFile.public_id
  );

  throw error;
}}};

export default receiptsService;