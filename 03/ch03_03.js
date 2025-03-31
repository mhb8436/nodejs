require("dotenv").config();
const path = require("path");

// 1. 기본 환경 변수 사용
console.log("=== 기본 환경 변수 사용 ===");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", process.env.PORT);
console.log("DATABASE_URL:", process.env.DATABASE_URL);

// 2. 환경별 설정 파일
const config = {
  development: {
    port: 3000,
    database: {
      host: "localhost",
      port: 27017,
      name: "dev_db",
    },
    logging: {
      level: "debug",
      file: "dev.log",
    },
  },
  production: {
    port: process.env.PORT || 80,
    database: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      name: process.env.DB_NAME,
    },
    logging: {
      level: "error",
      file: "prod.log",
    },
  },
};

// 3. 현재 환경 설정 가져오기
const currentEnv = process.env.NODE_ENV || "development";
const currentConfig = config[currentEnv];

console.log("\n=== 환경별 설정 ===");
console.log("현재 환경:", currentEnv);
console.log("설정:", currentConfig);

// 4. 환경 변수 검증
function validateConfig() {
  const requiredEnvVars = ["DB_HOST", "DB_PORT", "DB_NAME"];
  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `필수 환경 변수가 설정되지 않았습니다: ${missingVars.join(", ")}`
    );
  }
}

// 5. 환경 변수 타입 변환
const configWithTypes = {
  port: parseInt(process.env.PORT, 10) || 3000,
  debug: process.env.DEBUG === "true",
  maxConnections: parseInt(process.env.MAX_CONNECTIONS, 10) || 100,
  allowedOrigins: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : ["http://localhost:3000"],
};

console.log("\n=== 타입 변환된 설정 ===");
console.log("포트:", configWithTypes.port, typeof configWithTypes.port);
console.log(
  "디버그 모드:",
  configWithTypes.debug,
  typeof configWithTypes.debug
);
console.log(
  "최대 연결 수:",
  configWithTypes.maxConnections,
  typeof configWithTypes.maxConnections
);
console.log("허용된 출처:", configWithTypes.allowedOrigins);

// 6. 환경 변수 암호화/복호화
const crypto = require("crypto");

function encrypt(text, key) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function decrypt(text, key) {
  const [ivHex, encryptedHex] = text.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
  let decrypted = decipher.update(encrypted);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// 테스트
const secretKey =
  process.env.ENCRYPTION_KEY || "your-secret-key-32-chars-long!!";
const sensitiveData = "my-secret-password";
const encrypted = encrypt(sensitiveData, secretKey);
const decrypted = decrypt(encrypted, secretKey);

console.log("\n=== 환경 변수 암호화 ===");
console.log("원본:", sensitiveData);
console.log("암호화:", encrypted);
console.log("복호화:", decrypted);

// 7. 환경 변수 파일 자동 생성
const fs = require("fs");
const envExamplePath = path.join(__dirname, ".env.example");
const envPath = path.join(__dirname, ".env");

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  fs.copyFileSync(envExamplePath, envPath);
  console.log("\n.env 파일이 생성되었습니다. 환경 변수를 설정해주세요.");
}
