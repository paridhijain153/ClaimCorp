import receiptsRepository from "./receipts.repository.js";
import expensesRepository from "../expenses/expenses.repository.js";
import uploadToCloudinary from "../../utils/uploadToCloudinary.js";
import deleteFromCloudinary from "../../utils/deleteFromCloudinary.js";
import aiService from "../ai/ai.service.js";

import ApiError from "../../utils/ApiError.js";
import {
  HTTP_STATUS,
  EXPENSE_STATUS,
  RECEIPT_PROCESSING_STATUS,
} from "../../utils/constants.js";

const receiptsService = {
  async uploadReceipt(expenseId, employeeId, file) {
    // Validate file
    if (!file) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Receipt file is required."
      );
    }

    // Check expense
    const expense = await expensesRepository.findExpenseById(expenseId);

    if (!expense) {
      throw new ApiError(
        HTTP_STATUS.NOT_FOUND,
        "Expense not found."
      );
    }

    // Ownership check
    if (expense.employee.id !== employeeId) {
      throw new ApiError(
        HTTP_STATUS.FORBIDDEN,
        "You can upload receipts only to your own expenses."
      );
    }

    // Draft only
    if (expense.status !== EXPENSE_STATUS.DRAFT) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Receipts can only be uploaded to draft expenses."
      );
    }

    // Upload image to Cloudinary
    const uploadedFile = await uploadToCloudinary(file.buffer);

    let receipt;

    try {
      // Save receipt metadata
      receipt = await receiptsRepository.createReceipt({
        expenseId,
        fileName: file.originalname,
        fileUrl: uploadedFile.secure_url,
        cloudinaryPublicId: uploadedFile.public_id,
        mimeType: file.mimetype,
        fileSize: file.size,
      });

      // OCR started
      await receiptsRepository.updateReceipt(receipt.id, {
        processingStatus: RECEIPT_PROCESSING_STATUS.PROCESSING,
      });

      // Extract data using Gemini
      const ocrData = await aiService.extractReceiptData(
        file.buffer,
        file.mimetype
      );
const fraudAnalysis =
  aiService.calculateFraudScore(
    expense,
    ocrData
  );
      // Save OCR result
      const updatedReceipt =
  await receiptsRepository.updateReceipt(
    receipt.id,
    {
      processingStatus: RECEIPT_PROCESSING_STATUS.COMPLETED,

      merchantName: ocrData.merchantName,

      invoiceNumber: ocrData.invoiceNumber,

      invoiceDate: ocrData.invoiceDate
        ? new Date(ocrData.invoiceDate)
        : null,

      detectedAmount: ocrData.amount,

      detectedTax: ocrData.tax,

      ocrText: ocrData.ocrText,

      fraudScore: fraudAnalysis.fraudScore,

      isFraudulent:
        fraudAnalysis.isFraudulent,
    }
  );

      return updatedReceipt;
    } catch (error) {
      // Receipt never got created
      if (!receipt) {
        await deleteFromCloudinary(
          uploadedFile.public_id
        );
      } else {
        // Receipt exists but OCR failed
        await receiptsRepository.updateReceipt(
          receipt.id,
          {
            processingStatus: RECEIPT_PROCESSING_STATUS.FAILED,
          }
        );
      }

      throw error;
    }
  },
};

export default receiptsService;