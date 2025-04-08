// npm install dotenv lodash

require("dotenv").config();

// 환경 변수 사용 예시
const config = {
  dbUrl: process.env.DB_URL,
  apiKey: process.env.API_KEY,
  nodeEnv: process.env.NODE_ENV,
  debug: process.env.DEBUG === "true",
};

console.log(config);

// 환경 변수 검증
function validateConfig() {
  const requiredEnvVars = ["DB_URL", "API_KEY"];
  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `필수 환경 변수가 설정되지 않았습니다: ${missingVars.join(", ")}`
    );
  }
}

// 환경 변수 로깅 (개발 환경에서만)
if (config.nodeEnv === "development") {
  console.log("현재 환경 설정:", {
    ...config,
    apiKey: "***", // API 키는 보안을 위해 숨김
  });
}

// 환경 변수 검증 실행
validateConfig();
