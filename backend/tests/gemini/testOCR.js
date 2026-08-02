import "dotenv/config";

import fs from "fs";

import aiService from "../../src/modules/ai/ai.service.js";

const image = fs.readFileSync(
  "./tests/gemini/sample-image.png"
);

const result =
  await aiService.extractReceiptData(
    image,
    "image/png"
  );

console.log(result);