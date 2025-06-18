const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

const todosRouter = require("./routes/todos");

const app = express();

// Swagger 설정
const swaggerDocument = YAML.load(path.join(__dirname, "swagger.yaml"));

// 미들웨어
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// API 문서
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API 버전 접두사
const API_PREFIX = "/api/v1";

// 라우터 마운트
app.use(`${API_PREFIX}/todos`, todosRouter);

// 기본 라우트
app.get("/", (req, res) => {
  res.json({
    message: "API 개발 도구와 문서화 예제 서버",
    docs: "/api-docs",
    endpoints: {
      todos: `${API_PREFIX}/todos`,
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
  console.log(`API 문서: http://localhost:${PORT}/api-docs`);
});
