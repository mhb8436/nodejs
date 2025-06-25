// Winston 로거 가져오기
const { error } = require('./logger');

// 사용자 정의 에러 클래스
class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// 에러 처리 미들웨어
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "서버 내부 오류";

  // Winston 로거를 사용하여 에러 로깅
  error(`에러 처리 미들웨어: ${statusCode} - ${message}`, {
    statusCode,
    path: req.path,
    method: req.method,
    stack: err.stack
  });

  res.status(statusCode).json({
    error: {
      message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
};

module.exports = { AppError, errorHandler };
