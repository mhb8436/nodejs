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

// 4. 로그 포맷 커스터마이징
const customFormat = winston.format.printf(
  ({ level, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} [${level}] : ${message}`;
    if (Object.keys(metadata).length > 0) {
      msg += JSON.stringify(metadata);
    }
    return msg;
  }
);

const customLogger = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), customFormat),
  transports: [new winston.transports.Console()],
});

console.log("\n=== 커스텀 포맷 ===");
customLogger.info("커스텀 포맷 로그", { additional: "데이터" });

// 5. 로그 로테이션
const { createLogger, format, transports } = winston;
const { combine, timestamp, printf } = format;

const rotateLogger = createLogger({
  format: combine(
    timestamp(),
    printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new transports.File({
      filename: path.join(__dirname, "logs", "rotate.log"),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
});

console.log("\n=== 로그 로테이션 ===");
// 대용량 로그 생성
for (let i = 0; i < 1000; i++) {
  rotateLogger.info(`테스트 로그 메시지 ${i}`);
}

// 6. 예외 처리
console.log("\n=== 예외 처리 ===");
process.on("uncaughtException", (error) => {
  logger.error("처리되지 않은 예외:", error);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("처리되지 않은 Promise 거부:", reason);
});

// 테스트를 위한 예외 발생
setTimeout(() => {
  throw new Error("테스트 예외");
}, 1000);

// 7. 로그 필터링
const filteredLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "logs", "filtered.log"),
      filter: (level) => level === "error" || level === "warn",
    }),
  ],
});
console.log("\n=== 로그 필터링 ===");
filteredLogger.error("이것은 기록됩니다");
filteredLogger.warn("이것도 기록됩니다");
filteredLogger.info("이것은 기록되지 않습니다");

// 8. 로그 레벨 동적 변경
console.log("\n=== 로그 레벨 동적 변경 ===");
logger.level = "debug";
logger.debug("이제 디버그 로그가 표시됩니다");
logger.level = "error";
logger.info("이 정보 로그는 표시되지 않습니다");
