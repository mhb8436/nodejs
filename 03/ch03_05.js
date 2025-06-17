// dotenv 설치하기: npm install dotenv
// .env 파일을 만들어주세요 (예시):
/*
PORT=3000
DB_NAME=myapp
API_KEY=abc123
*/

// 1단계: dotenv 기본 사용법
// .env 파일의 내용을 불러옵니다
require("dotenv").config();

// 2단계: 환경변수 읽어보기
console.log("\n=== 기본 사용법 ===");
console.log("서버 포트:", process.env.PORT);
console.log("DB 이름:", process.env.DB_NAME);
console.log("API 키:", process.env.API_KEY);

// 3단계: 환경변수를 객체로 모아서 사용하기
console.log("\n=== 객체로 사용하기 ===");
const myConfig = {
  port: process.env.PORT || 3000, // 기본값 설정 가능
  dbName: process.env.DB_NAME,
  apiKey: process.env.API_KEY,
};

console.log("설정 내용:", {
  ...myConfig,
  apiKey: "***", // 보안을 위해 API 키는 숨김
});

// 4단계: 환경변수 값 검증하기 (간단버전)
console.log("\n=== 값 검증하기 ===");
if (!process.env.API_KEY) {
  console.error("API_KEY가 설정되지 않았습니다!");
}

// 5단계: 개발환경/운영환경 구분하기
console.log("\n=== 환경 구분하기 ===");
const isDevelopment = process.env.NODE_ENV === "development";

if (isDevelopment) {
  console.log("개발 환경에서 실행 중입니다");
} else {
  console.log("운영 환경에서 실행 중입니다");
}

/*
=== dotenv 사용 팁 ===
1. .env 파일은 .gitignore에 추가하기
2. .env.example 파일을 만들어서 어떤 환경변수가 필요한지 공유하기
3. 민감한 정보(API 키, 비밀번호 등)는 항상 .env 파일에 저장하기
*/
