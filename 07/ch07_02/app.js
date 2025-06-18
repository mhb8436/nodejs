const express = require("express");
const morgan = require("morgan");
const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(morgan("dev")); // HTTP 요청 로깅

// 디버깅을 위한 미들웨어
app.use((req, res, next) => {
  // 1. 요청 정보 로깅
  console.log("\n--- 요청 정보 ---");
  console.log("URL:", req.url);
  console.log("Method:", req.method);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  console.log("Query:", req.query);
  console.log("Params:", req.params);

  // 원본 send 메소드 저장
  const originalSend = res.send;

  // 2. 응답 정보 로깅을 위해 send 메소드 래핑
  res.send = function (data) {
    console.log("\n--- 응답 정보 ---");
    console.log("Status:", res.statusCode);
    console.log("Body:", data);

    // 원본 send 메소드 호출
    originalSend.call(this, data);
  };

  next();
});

// 테스트용 API 엔드포인트
app.get("/api/hello", (req, res) => {
  res.json({ message: "안녕하세요!" });
});

app.post("/api/echo", (req, res) => {
  res.json({
    received: {
      body: req.body,
      query: req.query,
      headers: req.headers,
    },
  });
});

app.get("/api/error", (req, res) => {
  // 의도적인 에러 발생 (디버깅 테스트용)
  throw new Error("테스트 에러 발생!");
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error("\n--- 에러 정보 ---");
  console.error("Error:", err.message);
  console.error("Stack:", err.stack);

  res.status(500).json({ error: "서버 에러가 발생했습니다." });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
  console.log("morgan으로 모든 HTTP 요청이 콘솔에 기록됩니다.");
  console.log("자세한 요청/응답 정보도 콘솔에서 확인할 수 있습니다.");
});
