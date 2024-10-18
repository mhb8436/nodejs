const http = require("http");
const url = require("url");

http
  .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    console.log(path, req.url);
    if (path == "/hello") {
      res.end("<h1>hello</h1>");
    } else if (path == "/world") {
      res.end("<h1>world</h1>");
    } else if (path == "/") {
      res.end("first page");
    }
  })
  .listen(4500);

// http://localhost:4500/hello?title=제목이야&content=나는내용이야
