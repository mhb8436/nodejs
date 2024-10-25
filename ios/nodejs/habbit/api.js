const express = require("express");
const fs = require("fs");
const moment = require("moment");
const sqlite3 = require("sqlite3");
const path = require("path");

// database setting
const db_name = path.join(__dirname, "post.db");
const db = new sqlite3.Database(db_name);

const app = express();
const PORT = 3001;

app.use(express.json());

app.get("/users", (req, res) => {
  const users_sql = `select * from users`;
  db.all(users_sql, [], (err, rows) => {
    res.json({ users: rows });
  });
});

app.get("/users/:user_id/habit", (req, res) => {
  const user_id = req.params.user_id; // modified

  const list_sql = `
      select 
      row_number() over(order by id) as rn, 
      id,
      habit_name, start_date, end_date, 
      (select count(1) from records r where r.habit_id = h.id ) count
      from habits h where user_id = ${user_id}
    `; // modified

  db.all(list_sql, [], (err, rows) => {
    if (err) {
      res.status(500).send(`error : ${err}`);
    }
    if (rows) {
      res.json({ habits: rows }); // modified
    }
  });
});

// habit add
app.post("/users/:user_id/habit/add", (req, res) => {
  const { habit_name, start_date, end_date } = req.body;

  const user_id = req.params.user_id;
  const insert_sql = `
          insert into habits(habit_name, start_date, end_date, user_id) values('${habit_name}','${start_date}','${end_date}', ${user_id})
      `;
  db.run(insert_sql, (err) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    }
    res.redirect(`/users/${user_id}/habit`);
  });
});

app.delete("/users/:user_id/habit/:id", (req, res) => {
  const habit_id = req.params.id;
  const user_id = req.params.user_id; // added

  const delete_record_sql = `delete from records where habit_id = ?`;
  db.run(delete_record_sql, [habit_id], (err) => {
    if (err) {
      res.status(500).send(`Internal Server Error [records] : ${err}`);
    }
    const delete_habit_sql = `delete from habits where id = ?`;

    db.run(delete_habit_sql, [habit_id], (err) => {
      if (err) {
        res.status(500).send(`Internal Server Error [habits ]: ${err}`);
      }
      res.redirect(`/users/${user_id}/habit`); // added
    });
  });
});
// localhost:3001/users/1/habit/8/record?id=1&test=value
app.get("/users/:user_id/habit/:id/record", (req, res) => {
  const habit_id = req.params.id;
  const user_id = req.params.user_id; // added
  req.query.id; // 1
  req.query.test; // value

  const record_sql = `
      select id, memo, createdAt from records where habit_id = ?
    `;
  db.all(record_sql, [habit_id], (err, rows) => {
    if (err) {
      res.status(500).send(`Internal Server error : ${err}`);
    }
    res.json({ records: rows }); // added
  });
});

app.post("/users/:user_id/habit/:id/record/add", (req, res) => {
  //added
  const habit_id = req.params.id;
  const user_id = req.params.user_id; //added
  const { memo } = req.body;

  const insert_record_sql = `
      insert into records(memo, habit_id) values(?, ?)
    `;

  db.run(insert_record_sql, [memo, habit_id], (err) => {
    if (err) {
      res.status.send(`InterServerError : ${err}`);
    }
    res.redirect(`/users/${user_id}/habit/${habit_id}/record`); //added
  });
});

app.delete("/users/:user_id/habit/:hid/record/:rid", (req, res) => {
  // added
  const habit_id = req.params.hid;
  const record_id = req.params.rid;
  const user_id = req.params.user_id; // added

  const delete_record_sql = `delete from records where id = ?`;
  db.run(delete_record_sql, [record_id], (err) => {
    if (err) {
      res.status.send(`Internal Server Error : ${err}`);
    }
    res.redirect(`/users/${user_id}/habit/${habit_id}/record`); //added
  });
});

app.listen(PORT, () => {
  console.log(`${PORT} 에서 서버 실행 중 `);
});
