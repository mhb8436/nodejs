const http = require("http");
const url = require("url");

http
  .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    const post = { title: "this is title", content: "this is content" };
    res.setHeader("Content-Type", "application/json");
    if (path == "/json") {
      const postStr = JSON.stringify(post);
      console.log(postStr);
      res.end(postStr);
    } else {
      res.end("<h1>help</h1>");
    }
  })
  .listen(4500);
