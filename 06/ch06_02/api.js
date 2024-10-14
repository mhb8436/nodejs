const express = require("express");
const fs = require("fs");
var moment = require("moment");
const sqlite3 = require("sqlite3");
const path = require("path");

// database setting
const db_name = path.join(__dirname, "post.db");
const db = new sqlite3.Database(db_name);

var app = express();
const PORT = 3000;

app.use(express.json());

const create_sql = `
    CREATE TABLE if not exists posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title VARCHAR(255), 
        content TEXT, 
        writer TEXT,
        write_date TEXT,
        count integer default 0
    )`;

db.serialize(() => {
  db.run(create_sql);
});

app.get("/posts", (req, res) => {
  let p = req.query.page;

  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = 5;
  const offset = (page - 1) * limit;

  let sql = `select id, title, content, writer, write_date 
        from posts ORDER BY write_date DESC LIMIT ? OFFSET ? `;

  db.all(sql, [limit, offset], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    } else {
      db.get(`SELECT COUNT(*) as count FROM posts`, (err, row) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        } else {
          const total = row.count;
          const totalPages = Math.ceil(total / limit);
          res.json({ items: rows, currentPage: page, totalPages });
        }
      });
    }
  });
});

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;

  let sql = `select id, title, content, writer, write_date, count from posts where id = ${id}`;
  console.log(`id => ${id}, sql => ${sql}`);
  let detail = {};
  db.run(`update board set count = count + 1 where id = ${id}`, (err) => {});
  db.all(sql, [], (err, rows) => {
    // 6. run query
    if (err) {
      console.error(err.message);
    }
    // console.log(rows);
    rows.forEach((row) => {
      detail = row;
    });
    console.log(detail);
    res.json({ item: detail }); // 8. render page with data
  });
});

app.post("/posts", (req, res) => {
  console.log("/write post", req.body);
  const write_date = moment().format("YYYY-MM-DD");
  let sql = `insert into posts(title, content, writer, write_date) 
        values('${req.body.title}', '${req.body.content}', 'tester', '${write_date}')`;
  db.run(sql, (err) => {
    if (err) {
      console.error(err);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
    res.redirect("/posts");
  });
});

app.put("/posts/:id", (req, res) => {
  const id = req.params.id;

  let sql = `update posts set title = '${req.body.title}', content = '${req.body.content}' where id = ${id}`;
  db.run(sql, (err) => {
    if (err) {
      console.error(err);
    }
    console.log(`A row has been updated with rowid ${this.lastID}`);
    res.redirect("/list");
  });
});

app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;

  let sql = `delete from posts where id = ${id}`;
  db.run(sql, (err) => {
    if (err) {
      console.error(err);
    }
    console.log(`A row has been deleted with rowid ${this.lastID}`);
    res.redirect("/list");
  });
});

app.listen(PORT);
console.log("Server is listening on port 3000");
