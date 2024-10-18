const express = require("express");
const app = express();
const PORT = 3000;

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
  const data = {
    title: "제목이 들어갑니다",
    message: "안녕하세요 퍼그",
  };
  res.render("index", data);
});

app.listen(PORT, () => {
  console.log(`${PORT}로 웹서버 실행중...`);
});
