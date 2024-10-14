const Database = require("better-sqlite3");

// 데이터베이스 파일 생성/연결
const db = new Database("posts.db");

// 게시물 테이블이 없으면 생성
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL
  )
`
).run();

module.exports = db;
