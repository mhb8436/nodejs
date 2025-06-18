const express = require("express");
const morgan = require("morgan");

const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");

const app = express();

// 미들웨어
app.use(express.json());
app.use(morgan("dev"));

// API 버전 접두사
const API_PREFIX = "/api/v1";

// 라우터 마운트
app.use(`${API_PREFIX}/users`, usersRouter);
app.use(`${API_PREFIX}/posts`, postsRouter);

// 기본 라우트
app.get("/", (req, res) => {
  res.json({
    message: "라우터 모듈화 예제 서버",
    endpoints: {
      users: `${API_PREFIX}/users`,
      posts: `${API_PREFIX}/posts`,
    },
  });
});

// 404 처리
app.use((req, res) => {
  res.status(404).json({ message: "요청한 리소스를 찾을 수 없습니다." });
});

// 에러 처리
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "서버 에러가 발생했습니다." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
