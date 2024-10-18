const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs"); // 템플릿 엔진을 EJS로 설정
app.set("views", "./views"); // 템플릿 디렉토리 설정

app.get("/", (req, res) => {
  const data = {
    title: "EJS 예제",
    message: "안녕 EJS",
  };
  res.render("index", data);
});

app.get("/for", (req, res) => {
  res.render("for");
});

app.get("/if", (req, res) => {
  res.render("if");
});

app.get("/test", (req, res) => {
  const data = fs.readFileSync("test.json", "utf-8");
  const result = JSON.parse(data);
  res.render("test", { posts: result["result"] });
});

app.listen(PORT, () => {
  console.log(`${PORT}로 웹서버 실행 중..`);
});
