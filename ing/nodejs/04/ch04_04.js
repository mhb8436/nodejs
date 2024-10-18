const http = require("http");
const url = require("url");
const fs = require("fs");

// 여기에 list 함수를 정의할 겁니다.
const list = (req, res) => {
  const data = fs.readFileSync("test.json", "utf-8");
  const result = JSON.parse(data);
  console.log(result);
  const resStr = JSON.stringify(result);
  res.end(resStr);
};

const view = (req, res) => {}; // 게시판 상세보기
const write = (req, res) => {}; // 글쓰기
const edit = (req, res) => {}; // 글수정
const remove = (req, res) => {}; // 글 삭제
http
  .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "application/json");

    if (path == "/list") {
      list(req, res);
    } else if (paht == "/view") {
      view(req, res);
    } else if (path == "/write") {
      write(req, res);
    } else if (path == "/edit") {
      edit(req, res);
    } else if (path == "/delete") {
      remove(req, res);
    } else {
      res.end("");
    }
  })
  .listen(4500);
