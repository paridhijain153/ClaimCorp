import jwt from "jsonwebtoken";
import env from "../config/env.js";

/**
 * Generate JWT Token
 * @param {Object} payload
 * @returns {string}
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
};

/**
 * Verify JWT Token
 * @param {string} token
 * @returns {Object}
 */
export const verifyToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};