const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const tasksRouter = require("./routes/tasks");

const app = express();

// 미들웨어
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// API 버전 접두사
const API_PREFIX = "/api/v1";

// 라우터 마운트
app.use(`${API_PREFIX}/tasks`, tasksRouter);

// 기본 라우트
app.get("/", (req, res) => {
  res.json({
    message: "REST API 설계 예제 서버",
    endpoints: {
      tasks: {
        base: `${API_PREFIX}/tasks`,
        methods: {
          GET: "작업 목록 조회 (필터: status, priority)",
          POST: "새 작업 생성",
          "GET /:id": "특정 작업 조회",
          "PATCH /:id": "작업 수정",
          "DELETE /:id": "작업 삭제",
        },
      },
    },
  });
});

// 404 처리
app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: "요청한 리소스를 찾을 수 없습니다.",
  });
});

// 에러 처리
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "서버 에러가 발생했습니다.",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
