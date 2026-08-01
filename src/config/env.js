import dotenv from "dotenv";

dotenv.config();

const requiredEnvVariables = [
  "PORT",
  "NODE_ENV",
  "DATABASE_URL",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
];

for (const variable of requiredEnvVariables) {
  if (!process.env[variable]) {
    throw new Error(`Missing required environment variable: ${variable}`);
  }
}

const env = {
  PORT: Number(process.env.PORT),
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

export default Object.freeze(env);