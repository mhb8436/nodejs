const express = require('express');
const fs = require('fs');
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const app = express();
const PORT = 3000;

const users = [
    {username: 'admin', password: 'admin1234'},
    {username: 'mhb8436', password: 'dbwj1234'},
];
// cookie and session assign middleWare
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));


// 세션세팅
app.use(
  expressSession({
    secret: "sample",
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/", (req, res)=> {
    if(req.session.user) {
        res.render("home");
    }else{
        res.redirect("/login")
    }
});

app.get("/login", (req, res)=>{
    res.render("login");
});

app.get("/register", (req, res)=> {
    res.render("register");
});

app.post("/login", (req, res)=> {
    const {username, password} = req.body;
    const isUser = users.filter(x=> {
        return x.username == username  && x.password == password;
    });
    if(isUser.length > 0) {
        req.session.user = {
            username: username,
            authorized: true,
        }
        res.redirect("/");
    }else{
        res.redirect("/login");
    }
});


app.post("/register", (req, res)=> {
    const {username, password, name} = req.body;
    const isUser = users.filter(x=> {
        return x.username == username  && x.password == password;
    });
    if(isUser.length > 0) {
        res.status(401).send("존재하는 아이디입니다.");
    }else{
        users.push({
            username: username,
            password: password,
        });
        res.redirect("/login");
    }
});

app.listen(PORT, ()=>{
    console.log(`${PORT} 에서  웹 서버 실행 중`)
});