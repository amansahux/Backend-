import dotenv from "dotenv";
dotenv.config();

const ErrorHandler = (err, req, res, next) => {
  const response = {
    message: err.message || "Internal server error",
  };
  const statuscode = err.status || 500;
  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }
  res.status(statuscode).json(response);
};

export default ErrorHandler;
