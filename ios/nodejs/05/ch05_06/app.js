const express = require("express");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(
  expressSession({
    secret: "sample",
    resave: true,
    saveUninitialized: true,
  })
);

const users = [
  { username: "admin", password: "admin1234" },
  { username: "test", password: "test1234" },
];

app.get("/home", (req, res) => {
  if (req.session.user) {
    res.render("home");
  } else {
    res.redirect("/login");
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // const username = req.body.username;
  // const password = req.body.password;
  const isUser = users.filter((item) => {
    return item.username == username && item.password == password;
  });

  if (isUser.length > 0) {
    // 아이디와 비밀번호가 일치하는 사용자가 있네요
    req.session.user = {
      username: username,
      authorized: true,
    };
    res.redirect("/home");
  } else {
    // 아이디와 비밀번호가 일치하는 사용자가 없어요
    res.redirect("/login");
  }
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const { name, username, password } = req.body;
  const isUser = users.filter((x) => {
    // 데이터베이스에서 회원 존재여부 확인 쿼리
    return x.username == username && x.password == password;
  });
  if (isUser.length > 0) {
    // 이미 회원이 존재
    res.status(401).send("이미 존재하는 아이디 ");
  } else {
    // 회원가입 - 프로젝트에서는 회원테이블에 insert 로직이 들어가면 됩니다.
    users.push({
      name: name,
      username: username,
      password: password,
    });
    res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {
  if (req.session.user) {
    req.session.user = null;
  }
  res.redirect("/login");
});

app.listen(PORT, () => {
  console.log(`${PORT} 에서 웹서버 실행 중....`);
});
