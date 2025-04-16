const express = require("express");
const fs = require("fs");
var moment = require("moment");
const Database = require("better-sqlite3");
const path = require("path");

// database setting
const db_name = path.join(__dirname, "todo.db");
const db = new Database(db_name);

var app = express();
const PORT = 3000;

app.use(express.json());

const create_sql = `
    CREATE TABLE if not exists todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        task VARCHAR(255), 
        description TEXT, 
        completed BOOLEAN DEFAULT 0,
        createdAt datetime default current_timestamp,
        priority INTEGER DEFAULT 1
    )`;

db.exec(create_sql);

app.get("/todos", (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = 5;
  const offset = (page - 1) * limit;
  let sql = `select id, task, description, completed, createdAt, priority 
        from todos ORDER BY priority DESC, createdAt DESC LIMIT ? OFFSET ? `;

  const stmt = db.prepare(sql);
  const rows = stmt.all(limit, offset);
  res.json({ data: rows });
});

app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  let sql = `select id, task, description, completed, createdAt, priority from todos where id = ?`;
  const stmt = db.prepare(sql);
  const todo = stmt.get(id);
  res.json({ data: todo });
});

app.post("/todos", (req, res) => {
  const { task, description, priority } = req.body;
  let sql = `insert into todos(task, description, priority) 
          values(?, ?, ?)`;
  db.prepare(sql).run(task, description, priority);
  res.json({ message: "Todo created successfully" });
});

app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const { task, description, completed, priority } = req.body;
  let sql = `update todos set task = ?, description = ?, completed = ?, priority = ? where id = ?`;
  db.prepare(sql).run(task, description, completed, priority, id);
  res.json({ message: "Todo updated successfully" });
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  let sql = `delete from todos where id = ?`;
  db.prepare(sql).run(id);
  res.json({ message: "Todo deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
