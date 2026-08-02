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
};

export default aiService;