const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

app.get("/list", (req, res) => {
  list(req, res);
});

app.get("/view/:id", (req, res) => {
  const id = req.params.id;

  const data = fs.readFileSync("test.json", "utf-8");
  const result = JSON.parse(data);
  const posts = result["result"];
  let post = {};

  posts.forEach((item) => {
    if (item.id == id) {
      post = item;
    }
  });
  res.json(post);
}); // http://localhost:3000/view/2

const list = (req, res) => {
  const data = fs.readFileSync("test.json", "utf-8");
  const result = JSON.parse(data);
  res.json(result);
};

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
