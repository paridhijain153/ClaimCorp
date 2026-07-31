class ApiError extends Error {
  constructor(statusCode, message, errors = null) {
    super(typeof message === "string" ? message : "Validation Failed");

    this.success = false;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export default ApiError;