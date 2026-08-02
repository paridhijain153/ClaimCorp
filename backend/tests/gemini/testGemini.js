import "dotenv/config";
import ai from "../../src/config/gemini.js";

const response = await ai.models.generateContent({
  model: "gemini-flash-latest",
  contents: "Say Hello from Gemini",
});

console.log(response.text);