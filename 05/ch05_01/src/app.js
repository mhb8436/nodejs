const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const logger = require("./middleware/logger");
const { AppError, errorHandler } = require("./middleware/error-handler");

const app = express();

// 기본 미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());

// 정적 파일 제공
app.use("/static", express.static(path.join(__dirname, "public")));

// 커스텀 로거 미들웨어
app.use(logger);

// 라우트
app.get("/", (req, res) => {
  res.json({ message: "미들웨어 예제 서버가 실행 중입니다." });
});

// 에러 발생 테스트 라우트
app.get("/error", (req, res, next) => {
  throw new AppError(400, "의도적으로 발생시킨 에러입니다.");
});

// 비동기 에러 테스트 라우트
app.get("/async-error", async (req, res, next) => {
  try {
    // 의도적으로 에러 발생
    await Promise.reject(new Error("비동기 작업 중 발생한 에러"));
  } catch (error) {
    next(new AppError(500, error.message));
  }
});

// 404 에러 처리
app.use((req, res, next) => {
  next(new AppError(404, `${req.originalUrl} 경로를 찾을 수 없습니다.`));
});

// 에러 처리 미들웨어
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
