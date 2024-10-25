const fs = require("fs");

const result = fs.readFileSync("test.json", "utf-8");
// console.log(result);
const data = JSON.parse(result);
// console.log(data["result"]);
const arr = data["result"];
arr.forEach((x) => {
  console.log(x["title"], x["content"], x.title);
});

// https://github.com/mhb8436/nodejs
