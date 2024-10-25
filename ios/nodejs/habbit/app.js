const express = require("express");
const fs = require("fs");
const moment = require("moment");
const sqlite3 = require("sqlite3");
const path = require("path");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

// database setting
const db_name = path.join(__dirname, "post.db");
const db = new sqlite3.Database(db_name);

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public")); // http://localhost:3000/css/style.css

app.use(cookieParser());
app.use(
  expressSession({
    secret: "sample",
    resave: true,
    saveUninitialized: true,
  })
);

const create_users_sql = `
  create table if not exists users(
        id integer primary key AUTOINCREMENT,
        name varchar(100),
        email varchar(255) UNIQUE, 
        password varchar(255),
        createdAt datetime default CURRENT_TIMESTAMP
    );
`;

const create_habits_sql = `
    create table if not exists habits (
        id integer PRIMARY key AUTOINCREMENT,
        habit_name varchar(255), 
        start_date datetime,
        end_date datetime,
        createdAt datetime default CURRENT_TIMESTAMP,
        user_id integer not null, 
        FOREIGN KEY(user_id) REFERENCES users(id)
    );
`;

const create_records_sql = `
    create table if not exists records (
        id integer PRIMARY key AUTOINCREMENT,
        memo varchar(255),
        createdAt datetime default CURRENT_TIMESTAMP,
        habit_id integer not null,
        FOREIGN KEY(habit_id) REFERENCES habits(id)
    );
`;

db.serialize(() => {
  db.run(create_users_sql);
  db.run(create_habits_sql);
  db.run(create_records_sql);
});

app.use(express.urlencoded({ extended: true }));
// register 관련된 get router, post router
// get router -> register.ejs
app.get("/register", (req, res) => {
  res.render("register");
});

// post router -> form에서 받은 회원가입 정보를 이용해서 디비에회원 가입
app.post("/register", (req, res) => {
  const { name, username, password } = req.body;

  const check_dup_email_sql = `select count(1) as count from users where email = '${username}'`;

  db.get(check_dup_email_sql, (err, row) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    }
    if (row.count > 0) {
      res.status(200).send("Already Email .. ");
    } else {
      const insert_user_sql = `insert into users(name, email, password) values('${name}','${username}','${password}');`;
      db.run(insert_user_sql);
      res.redirect("/login");
    }
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  // username=aa@gmail.com&password=12345
  const { username, password } = req.body;
  // 데이터베이스에서 username aa@gmail.com 이고 password 12345 인 사용자 있는지
  // 체크하기 위해서 select 을 이용해서 해당 유저를 찾아와야 됩니다.

  const check_sql = `select * from users where email='${username}' and password = '${password}'`;
  db.get(check_sql, (err, row) => {
    // row -> 유저의 객체가 있겠죠
    // row 없는 경우에는 해당 유저가 없기 때문에 다시 로그인 페이지로 이동
    console.log(row);
    if (row) {
      req.session.user = {
        id: row.id,
        username: row.username,
        name: row.name,
      };
      res.redirect("/habit");
    } else {
      res.redirect("/login");
    }
  });
});

app.get("/habit", (req, res) => {
  const user = req.session.user;
  if (user == undefined) {
    res.redirect("/login");
    return;
  }
  const list_sql = `
    select 
    row_number() over(order by id) as rn, 
    id,
    habit_name, start_date, end_date, 
    (select count(1) from records r where r.habit_id = h.id ) count
    from habits h where user_id = ${user.id}
  `;

  db.all(list_sql, [], (err, rows) => {
    if (err) {
      res.status(500).send(`error : ${err}`);
    }
    if (rows) {
      res.render("habit_list", { habits: rows });
    }
  });
});

app.get("/habit/add", (req, res) => {
  res.render("habit_add");
});

app.post("/habit/add", (req, res) => {
  const { habit_name, start_date, end_date } = req.body;
  const user = req.session.user;
  if (user == undefined) {
    res.redirect("/login");
    return;
  }
  const insert_sql = `
        insert into habits(habit_name, start_date, end_date, user_id) values('${habit_name}','${start_date}','${end_date}', ${user.id})
    `;
  db.run(insert_sql, (err) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    }
    res.redirect("/habit");
  });
});

app.get("/habit/:id/record", (req, res) => {
  const habit_id = req.params.id;
  const record_sql = `
    select id, memo, createdAt from records where habit_id = ?
  `;
  db.all(record_sql, [habit_id], (err, rows) => {
    if (err) {
      res.status(500).send(`Internal Server error : ${err}`);
    }
    res.render("habit_record_list", { habit_id: habit_id, records: rows });
  });
});

app.get("/habit/:id/record/add", (req, res) => {
  const habit_id = req.params.id;
  res.render("habit_record_add", { habit_id: habit_id });
});

app.post("/habit/:id/record/add", (req, res) => {
  const habit_id = req.params.id;
  const { memo } = req.body;

  const insert_record_sql = `
    insert into records(memo, habit_id) values(?, ?)
  `;

  db.run(insert_record_sql, [memo, habit_id], (err) => {
    if (err) {
      res.status.send(`InterServerError : ${err}`);
    }
    res.redirect(`/habit/${habit_id}/record`);
  });
});

app.get("/habit/:hid/record/:rid/remove", (req, res) => {
  const habit_id = req.params.hid;
  const record_id = req.params.rid;

  const delete_record_sql = `delete from records where id = ?`;
  db.run(delete_record_sql, [record_id], (err) => {
    if (err) {
      res.status.send(`Internal Server Error : ${err}`);
    }
    res.redirect(`/habit/${habit_id}/record`);
  });
});

app.get("/habit/:id/remove", (req, res) => {
  const habit_id = req.params.id;
  // 기록(records) 먼저 지우고 FK : habit_id를 가지고 있는 기록테이블 지우고

  const delete_record_sql = `delete from records where habit_id = ?`;
  db.run(delete_record_sql, [habit_id], (err) => {
    if (err) {
      res.status.send(`Internal Server Error [records] : ${err}`);
    }
    const delete_habit_sql = `delete from habits where id = ?`;

    db.run(delete_habit_sql, [habit_id], (err) => {
      if (err) {
        res.status.send(`Internal Server Error [habits ]: ${err}`);
      }
      res.redirect(`/habit`);
    });
  });
});

app.listen(PORT, () => {
  console.log(`${PORT} 에서 서버 실행 중 `);
});
