// npm install winston
const winston = require("winston");

// 1. 가장 기본적인 로거 생성
const logger = winston.createLogger({
  level: "info", // info 레벨 이상의 로그만 출력
  format: winston.format.simple(), // 간단한 텍스트 형식
  transports: [
    // 콘솔에 출력
    new winston.transports.Console(),
    // 파일에 저장
    new winston.transports.File({
      filename: "app.log",
    }),
  ],
});

// 2. 로그 레벨 알아보기 (중요도 순)
console.log("=== 로그 레벨 테스트 ===");
console.log("로그 레벨: error > warn > info > debug > silly");

logger.error("에러 발생! - 가장 중요한 메시지");
logger.warn("경고! - 주의가 필요한 메시지");
logger.info("정보 - 일반적인 정보 메시지");
logger.debug("디버그 - 개발 중에만 사용하는 메시지");

// 3. 실제 사용 예시
console.log("\n=== 실제 사용 예시 ===");

// 사용자 로그인 시
logger.info("사용자가 로그인했습니다");

// 에러 발생 시
try {
  // 의도적으로 에러 발생
  throw new Error("파일을 찾을 수 없습니다");
} catch (error) {
  logger.error("로그인 처리 중 오류 발생", error.message);
}

// 4. 간단한 로그 포맷팅
console.log("\n=== 로그 포맷팅 예시 ===");

const simpleLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(), // 시간 추가
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

simpleLogger.info("타임스탬프가 포함된 로그");
simpleLogger.warn("경고 메시지도 시간이 표시됩니다");

console.log("\n=== 로그 파일 확인 ===");
console.log("app.log 파일을 확인해보세요!");
