const http = require("http");

const server = http.createServer((req, res) => {
  // 응답 헤더 설정
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });

  // 요청 정보 출력
  console.log("요청 URL:", req.url);
  console.log("요청 메서드:", req.method);
  console.log("요청 헤더:", req.headers);

  // 응답 메시지 전송
  res.end("안녕하세요! Node.js 웹 서버입니다.");
});

// 서버 시작
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
