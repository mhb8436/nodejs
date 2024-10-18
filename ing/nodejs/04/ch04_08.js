const express = require("express");

const app = express();
const port = 3000;

app.get("/home", (req, res) => {
  res.send(`
        <h1>환영합니다.</h1>
        <h2>집에 오신걸 더 환영합니다.</h2>
        `);
});

app.listen(port, () => {
  console.log(`${port} 포트로 웹서버 뜸`);
});
