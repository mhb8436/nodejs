const http = require("http");
const url = require("url");
const fs = require("fs");

http
  .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "application/json");

    if (path == "/json") {
      const data = fs.readFileSync("test.json", "utf-8");
      const result = JSON.parse(data);
      const resStr = JSON.stringify(result);
      res.end(resStr);
    } else if ((path = "/text")) {
    } else if ((path = "/about")) {
    } else if ((path = "/intro")) {
    } else if ((path = "/boar")) {
    } else if ((path = "/home")) {
    }
  })
  .listen(4500);
