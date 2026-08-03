import ai from "../../config/gemini.js";

import { GEMINI_MODELS } from "./constants.js";
import { RECEIPT_OCR_PROMPT } from "./prompts.js";
import { parseGeminiJSON } from "./parsers.js";
import { receiptOCRSchema } from "./schemas.js";

const aiService = {
  async extractReceiptData(fileBuffer, mimeType) {
    console.log("1. Starting OCR...");

    const base64Image = fileBuffer.toString("base64");

    console.log("2. Calling Gemini...");

    const response = await ai.models.generateContent({
  model: GEMINI_MODELS.FLASH,

  contents: {
    parts: [
      {
        inlineData: {
          mimeType,
          data: base64Image,
        },
      },
      {
        text: RECEIPT_OCR_PROMPT,
      },
    ],
  },
});

    console.log("3. Gemini responded!");

    const parsedData = parseGeminiJSON(response.text);

    console.log("4. Parsed successfully!");

    return receiptOCRSchema.parse(parsedData);
  },
  calculateFraudScore(expense, ocrData) {
  let score = 0;

  const claimedTotal =
    Number(expense.totalAmount);

  const detectedTotal =
    Number(ocrData.amount || 0) +
    Number(ocrData.tax || 0);

  // Rule 1
  if (
    Math.abs(claimedTotal - detectedTotal) > 1
  ) {
    score += 60;
  }

  // Rule 2
  if (!ocrData.merchantName) {
    score += 10;
  }

  // Rule 3
  if (!ocrData.invoiceNumber) {
    score += 10;
  }

  // Rule 4
  if (
    !ocrData.ocrText ||
    ocrData.ocrText.length < 30
  ) {
    score += 20;
  }

  return {
    fraudScore: score,
    isFraudulent: score >= 70,
  };
},
};

export default aiService;