const express = require("express");
const fs = require("fs");
var moment = require("moment");
const Database = require("better-sqlite3");
const path = require("path");

// database setting
const db_name = path.join(__dirname, "post2.db");
const db = new Database(db_name);

var app = express();
const PORT = 3000;

app.use(express.json());

const create_sql = `
    CREATE TABLE if not exists posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title VARCHAR(255), 
        content TEXT, 
        author TEXT,
        createAt datetime default current_timestamp,
        count integer default 0
    )`;

db.exec(create_sql);

app.get("/posts", (req, res) => {
  let p = req.query.page;

  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = 5;
  const offset = (page - 1) * limit;
  let sql = `select id, title, content, author, createAt 
        from posts ORDER BY createAt DESC LIMIT ? OFFSET ? `;

  const stmt = db.prepare(sql);
  const rows = stmt.all(limit, offset);
  console.log(rows);
  res.json({ data: rows });
});

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;

  let sql = `select id, title, content, author, createAt, count from posts where id = ?`;
  let ac_sql = `update posts set count = count + 1 where id = ?`;

  db.prepare(ac_sql).run(id);
  const stmt = db.prepare(sql);
  const post = stmt.get(id);

  res.json({ data: post });
});

app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;
  let sql = `insert into posts(title, content, author) 
          values(?, ?, ?)`;
  db.prepare(sql).run(title, content, author);
  res.redirect("/posts");
});

app.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  let sql = `update posts set title = ?, content = ? where id = ?`;
  db.prepare(sql).run(title, content, id);
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  let sql = `delete from posts where id = ?`;
  db.prepare(sql).run(id);
  res.redirect("/posts");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
