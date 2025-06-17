// Express.js로 간단한 홈페이지 만들기

const express = require("express");
const app = express();

// 정적 파일 제공
app.use(express.static("public"));

// 1. 홈페이지 라우트
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Express 홈페이지</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          h1 { color: #333; }
          nav { margin: 20px 0; }
          nav a { margin-right: 10px; }
        </style>
      </head>
      <body>
        <h1>Express.js 웹사이트</h1>
        <nav>
          <a href="/">홈</a>
          <a href="/about">소개</a>
          <a href="/contact">연락처</a>
        </nav>
        <p>Express.js로 만든 간단한 웹사이트입니다.</p>
      </body>
    </html>
  `);
});

// 2. 소개 페이지 라우트
app.get("/about", (req, res) => {
  res.send(
    "<h1>소개 페이지</h1><p>이 웹사이트는 Express.js 학습을 위해 만들어졌습니다.</p>"
  );
});

// 3. 연락처 페이지 라우트
app.get("/contact", (req, res) => {
  res.send("<h1>연락처</h1><p>이메일: example@example.com</p>");
});

const port = 3000;
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
