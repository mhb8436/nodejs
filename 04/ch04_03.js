// Express.js로 데이터 표시하기

const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

// 샘플 데이터
const books = [
  { id: 1, title: "노드.js 교과서", author: "조현영" },
  { id: 2, title: "한 눈에 보이는 Node.js", author: "박민우" },
  { id: 3, title: "Node.js 디자인 패턴", author: "마리오 카스치오" },
];

// JSON 파싱 미들웨어
app.use(express.json());

// 모든 책 목록 조회
app.get("/books", (req, res) => {
  res.json(books);
});

// 특정 ID의 책 조회
app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ message: "책을 찾을 수 없습니다." });
  }
  res.json(book);
});

// HTML 형식으로 책 목록 표시
app.get("/", (req, res) => {
  const bookList = books
    .map(
      (book) =>
        `<li>
      <strong>${book.title}</strong> (${book.author})
      <a href="/books/${book.id}">자세히 보기</a>
    </li>`
    )
    .join("");

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>도서 목록</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          h1 { color: #333; }
          ul { list-style-type: none; padding: 0; }
          li { margin: 10px 0; padding: 10px; border: 1px solid #ddd; }
          a { color: #0066cc; text-decoration: none; margin-left: 10px; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>도서 목록</h1>
        <ul>${bookList}</ul>
        <p>API 엔드포인트: <code>/books</code>와 <code>/books/:id</code>로도 접근 가능합니다.</p>
      </body>
    </html>
  `);
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
