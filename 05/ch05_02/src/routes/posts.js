const express = require("express");
const router = express.Router();

// 가상의 게시물 데이터
const posts = [
  { id: 1, title: "첫 번째 게시물", content: "안녕하세요!", userId: 1 },
  { id: 2, title: "두 번째 게시물", content: "반갑습니다!", userId: 2 },
];

// 게시물 목록 조회 (사용자 ID로 필터링 가능)
router.get("/", (req, res) => {
  const { userId } = req.query;

  if (userId) {
    const userPosts = posts.filter((p) => p.userId === parseInt(userId));
    return res.json(userPosts);
  }

  res.json(posts);
});

// 특정 게시물 조회
router.get("/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));

  if (!post) {
    return res.status(404).json({ message: "게시물을 찾을 수 없습니다." });
  }

  res.json(post);
});

// 게시물의 댓글 조회 (중첩 라우트 예시)
router.get("/:id/comments", (req, res) => {
  const postId = parseInt(req.params.id);

  // 가상의 댓글 데이터
  const comments = [
    { id: 1, postId, content: "좋은 글이네요!", userId: 2 },
    { id: 2, postId, content: "감사합니다!", userId: 1 },
  ];

  res.json(comments);
});

module.exports = router;
