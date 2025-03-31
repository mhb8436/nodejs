const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // 라우팅 처리
  switch (parsedUrl.pathname) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("홈페이지입니다.");
      break;

    case "/about":
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("소개 페이지입니다.");
      break;

    case "/api/data":
      if (req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "API 응답입니다." }));
      } else if (req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", () => {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              message: "데이터를 받았습니다.",
              data: body,
            })
          );
        });
      }
      break;

    default:
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("페이지를 찾을 수 없습니다.");
  }
});

server.listen(3000, () => {
  console.log("서버가 3000번 포트에서 실행 중입니다.");
});
