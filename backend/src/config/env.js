import dotenv from "dotenv";

dotenv.config();

const requiredEnvVariables = [
  "NODE_ENV",
  "DATABASE_URL",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
];

for (const variable of requiredEnvVariables) {
  if (!process.env[variable]) {
    throw new Error(
      `Missing required environment variable: ${variable}`
    );
  }
}

const env = {
  // Render automatically provides PORT.
  // Locally, default to 5000 if it's not set.
  PORT: Number(process.env.PORT) || 5000,

  NODE_ENV: process.env.NODE_ENV,

  DATABASE_URL: process.env.DATABASE_URL,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN:
    process.env.JWT_EXPIRES_IN,

  CLOUDINARY_CLOUD_NAME:
    process.env.CLOUDINARY_CLOUD_NAME,

  CLOUDINARY_API_KEY:
    process.env.CLOUDINARY_API_KEY,

  CLOUDINARY_API_SECRET:
    process.env.CLOUDINARY_API_SECRET,

  GEMINI_API_KEY:
    process.env.GEMINI_API_KEY,
};

export default Object.freeze(env);