import http from "http";
import url from "url";
import data from "./test.json" assert { type: "json" };

http
  .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    if (path === "/json") {
      res.end(JSON.stringify(data));
    } else if (path === "/add" && req.method === "POST") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          const newUser = JSON.parse(body);
          newUser.id = data.data.length + 1;
          data.data.push(newUser);

          res.end(
            JSON.stringify({
              success: true,
              message: "사용자가 추가되었습니다",
              newUser: newUser,
            })
          );
        } catch (error) {
          res.end(
            JSON.stringify({
              success: false,
              message: "잘못된 데이터 형식입니다",
            })
          );
        }
      });
    } else {
      res.end(
        JSON.stringify({
          success: false,
          message: "잘못된 요청입니다",
        })
      );
    }
  })
  .listen(4500, () => console.log("Add Routing 2"));
