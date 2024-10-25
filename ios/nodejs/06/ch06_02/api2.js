const express = require("express");
const moment = require("moment");
const path = require("path");
const Database = require("better-sqlite3");

// database setting
const db_name = path.join(__dirname, "post.db");
const db = new Database(db_name); // 데이터베이스 생성
const app = express(); // 익스프레스 생성
const PORT = 3000; // 포트 번호 할당
app.use(express.json()); // json 미들웨어 설정
const create_sql = `
    CREATE TABLE if not exists posts(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(255),
        content TEXT,
        author VARCHAR(100),
        createdAt datetime default current_timestamp,
        count integer default 0
    );

    CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL,
        postId INTEGER,
        FOREIGN KEY(postId) REFERENCES posts(id)
    );
`;
db.exec(create_sql);

// 1. GET /posts 게시글 목록
app.get("/posts", (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = 5; // 한페이지당 5개 글만 볼거야
  const offset = (page - 1) * limit; // page => 2 offset => 5
  let sql = `
          select id, title, author, createdAt, count from posts
          order by createdAt DESC limit ? offset ?
      `;
  const stmt = db.prepare(sql);
  const rows = stmt.all(limit, offset);
  res.json({ items: rows });
});

// 3. POST /posts 게시글 쓰기
app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;

  let sql = `
          insert into posts(title, content, author) values (?, ?, ?)
      `;
  const stmt = db.prepare(sql);
  const result = stmt.run(title, content, author);
  console.log(`${JSON.stringify(result)}`);
  res
    .status(201)
    .json({ id: result.lastInsertRowid, title: title, content: content });
});

// 2. GET /posts/1 게시글 상세
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  let sql = `select id, title, content, author, createdAt, count from posts where id = ?`;
  let count_sql = `update posts set count = count + 1 where id = ?`;
  db.prepare(count_sql).run(id);
  // const stmt = db.prepare(count_sql)
  // stmt.run(id);
  const post = db.prepare(sql).get(id);
  res.status(200).json({ item: post });
});

// 4. PUT /posts/1 게시글 수정
app.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  let sql = `update posts set title = ?, content = ? where id = ?`;
  try {
    const result = db.prepare(sql).run(title, content, id);
    console.log(`result => ${JSON.stringify(result)}`);
    if (result.changes) {
      res.status(200).json({ result: "success" });
    } else {
      res.status(404).json({ error: "post is not found" });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

// 5. DELETE /posts/1 게시글 삭제
app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  let sql = `delete from posts where id = ?`;
  try {
    const result = db.prepare(sql).run(id);
    if (result.changes) {
      res.status(204).end();
      // res.status(202).json({result:"success"});
    } else {
      res.status(404).json({ error: "post not found" });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
// 특정 포스트에 댓글 추가
app.post("/posts/:id/comments", (req, res) => {
  const { content } = req.body; // req.body.content --> content
  const postId = req.params.id;
  const stmt = db.prepare(`INSERT INTO comments(postId, content) VALUES(?, ?)`);
  const result = stmt.run(postId, content);
  res
    .status(201)
    .json({ id: result.lastInsertRowid, postId: postId, content: content });
});
// 특정 포스트의 댓글을 가져오고
app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const comments = db
    .prepare(`select * from comments where postId = ?`)
    .all(postId);
  res.json({ comments: comments });
});
// 댓글 삭제
app.delete("/comments/:id", (req, res) => {
  const id = req.params.id;
  const result = db.prepare(`delete from comments where id = ?`).run(id);
  if (result.changes) {
    res.status(204).end();
  } else {
    res.status(404).json({ error: "comment not found" });
  }
});
// 댓글 수정
app.put("/comments/:id", (req, res) => {
  // id 는 comments의 아이디
  const { content } = req.body;
  const id = req.params.id;
  const stmt = db.prepare(`update comments set content = ? where id = ?`);
  const result = stmt.run(content, id);
  if (result.changes) {
    res.status(200).json({ result: "success" });
  } else {
    res.status(404).json({ result: "error", message: "comment not found" });
  }
});

app.listen(PORT);
