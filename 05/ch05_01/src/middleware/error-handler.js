// 커스텀 에러 클래스
class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// 에러 처리 미들웨어
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: process.env.NODE_ENV === "development" ? err : {},
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

module.exports = {
  AppError,
  errorHandler,
};
