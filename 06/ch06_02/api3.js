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
    );
    
    CREATE TABLE if not exists comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        postId INTEGER,
        author TEXT,
        content TEXT,
        createAt datetime default current_timestamp,
        FOREIGN KEY(postId) REFERENCES posts(id) ON DELETE CASCADE
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

  // 전체 게시물 수 조회하여 페이지네이션 정보 제공
  const totalCount = db
    .prepare(`SELECT COUNT(*) as count FROM posts`)
    .get().count;
  const totalPages = Math.ceil(totalCount / limit);

  res.status(200).json({
    data: rows,
    pagination: {
      currentPage: page,
      totalPages: totalPages,
      totalCount: totalCount,
      limit: limit,
    },
  });
});

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;

  let sql = `select id, title, content, author, createAt, count from posts where id = ?`;
  let ac_sql = `update posts set count = count + 1 where id = ?`;

  db.prepare(ac_sql).run(id);
  const stmt = db.prepare(sql);
  const post = stmt.get(id);

  if (!post) {
    return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
  }

  res.status(200).json({ data: post });
});

app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;
  let sql = `insert into posts(title, content, author) 
          values(?, ?, ?)`;
  const result = db.prepare(sql).run(title, content, author);

  // 생성된 리소스 조회
  const newPost = db
    .prepare(`SELECT * FROM posts WHERE id = ?`)
    .get(result.lastInsertRowid);
  res.status(201).json({ message: "게시물이 생성되었습니다.", data: newPost });
});

app.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;

  // 먼저 게시물이 존재하는지 확인
  const existingPost = db.prepare(`SELECT * FROM posts WHERE id = ?`).get(id);
  if (!existingPost) {
    return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
  }

  // 수정할 내용 가져오기
  const newTitle = title !== undefined ? title : existingPost.title;
  const newContent = content !== undefined ? content : existingPost.content;

  // 수정하기
  let sql = `UPDATE posts SET title = ?, content = ? WHERE id = ?`;
  db.prepare(sql).run(newTitle, newContent, id);

  // 수정된 리소스 조회
  const updatedPost = db.prepare(`SELECT * FROM posts WHERE id = ?`).get(id);
  res
    .status(200)
    .json({ message: "게시물이 수정되었습니다.", data: updatedPost });
});

app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  // 삭제 전에 게시물이 존재하는지 확인
  const post = db.prepare(`SELECT id FROM posts WHERE id = ?`).get(id);
  if (!post) {
    return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
  }

  let sql = `delete from posts where id = ?`;
  db.prepare(sql).run(id);
  res.status(204).end(); // No Content 응답
});
app.use((req, res, next) => {
  console.log("middleware");
  next();
});
// 댓글 관련 API 엔드포인트 추가
app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;

  // 게시물이 존재하는지 확인
  const post = db.prepare(`SELECT id FROM posts WHERE id = ?`).get(postId);
  if (!post) {
    return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
  }

  const sql = `SELECT id, author, content, createAt FROM comments WHERE postId = ? ORDER BY createAt DESC`;
  const stmt = db.prepare(sql);
  const comments = stmt.all(postId);
  res.status(200).json({ data: comments });
});

app.post("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const { author, content } = req.body;

  // 게시물이 존재하는지 확인
  const post = db.prepare(`SELECT id FROM posts WHERE id = ?`).get(postId);
  if (!post) {
    return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
  }

  const sql = `INSERT INTO comments(postId, author, content) VALUES(?, ?, ?)`;
  const result = db.prepare(sql).run(postId, author, content);

  // 생성된 댓글 조회
  const newComment = db
    .prepare(`SELECT * FROM comments WHERE id = ?`)
    .get(result.lastInsertRowid);
  res.status(201).json({ message: "댓글이 추가되었습니다.", data: newComment });
});

app.delete("/posts/:postId/comments/:commentId", (req, res) => {
  const { postId, commentId } = req.params;

  // 댓글이 해당 게시물에 속하는지 확인
  const comment = db
    .prepare(`SELECT id FROM comments WHERE id = ? AND postId = ?`)
    .get(commentId, postId);
  if (!comment) {
    return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
  }

  const sql = `DELETE FROM comments WHERE id = ?`;
  db.prepare(sql).run(commentId);
  res.status(204).end(); // No Content 응답
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
