const express = require("express");
const { engine } = require("express-handlebars");

const app = express();
const PORT = 3000;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  const data = {
    title: "첫번째 핸들바",
    message: "수염이 멋집니다.",
  };
  res.render("index", data);
});

app.listen(PORT, () => {
  console.log(`${PORT} 웹 서버가 뜨고 있습니다.`);
});
