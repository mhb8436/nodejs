// npm install winston
const winston = require("winston");
const path = require("path");

// 1. 기본 로거 설정
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "logs", "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "logs", "combined.log"),
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

// 2. 로그 레벨별 사용
console.log("=== 로그 레벨별 사용 ===");
logger.error("에러 메시지");
logger.warn("경고 메시지");
logger.info("정보 메시지");
logger.debug("디버그 메시지");

// 3. 메타데이터 포함
console.log("\n=== 메타데이터 포함 ===");
logger.info("사용자 로그인", {
  userId: 123,
  ip: "192.168.1.1",
  userAgent: "Mozilla/5.0",
});
