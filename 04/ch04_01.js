// Express.js 웹 서버 만들기 - Hello World 예제

// 1. Express 모듈 가져오기
const express = require("express");

// 2. Express 애플리케이션 생성
const app = express();

// 3. 서버 포트 설정
const port = 3000;

// 4. 라우팅 설정
// GET 요청이 루트 경로(/)로 오면 'Hello World!' 응답
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 5. 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
