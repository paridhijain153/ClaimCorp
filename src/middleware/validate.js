import { ZodError } from "zod";
import ApiError from "../utils/ApiError.js";

const validate = (schema) => {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
return next(
  new ApiError(
    HTTP_STATUS.BAD_REQUEST,
    "Validation failed",
    error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }))
  )
);
      }

      next(error);
    }
  };
};

export default validate;