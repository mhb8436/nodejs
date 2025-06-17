const express = require("express");
const app = express();

app.use(express.json());

// 간단한 메모 API (문서화 예제용)
const memos = [];

// 메모 생성
app.post("/api/memos", (req, res) => {
  const { title, content } = req.body;
  const memo = {
    id: memos.length + 1,
    title,
    content,
    createdAt: new Date(),
  };

  memos.push(memo);
  res.status(201).json(memo);
});

// 메모 목록 조회
app.get("/api/memos", (req, res) => {
  res.json(memos);
});

// 특정 메모 조회
app.get("/api/memos/:id", (req, res) => {
  const memo = memos.find((m) => m.id === parseInt(req.params.id));
  if (!memo) {
    return res.status(404).json({ error: "메모를 찾을 수 없습니다." });
  }
  res.json(memo);
});

// 메모 수정
app.put("/api/memos/:id", (req, res) => {
  const { title, content } = req.body;
  const memo = memos.find((m) => m.id === parseInt(req.params.id));

  if (!memo) {
    return res.status(404).json({ error: "메모를 찾을 수 없습니다." });
  }

  memo.title = title;
  memo.content = content;
  memo.updatedAt = new Date();

  res.json(memo);
});

// 메모 삭제
app.delete("/api/memos/:id", (req, res) => {
  const index = memos.findIndex((m) => m.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: "메모를 찾을 수 없습니다." });
  }

  memos.splice(index, 1);
  res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
