export const GEMINI_MODELS = {
  FLASH: process.env.GEMINI_MODEL || "gemini-flash-latest",
};

export const OCR_STATUS = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
};