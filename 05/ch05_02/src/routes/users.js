const express = require("express");
const router = express.Router();

// 가상의 사용자 데이터
const users = [
  { id: 1, name: "김철수", email: "kim@example.com" },
  { id: 2, name: "이영희", email: "lee@example.com" },
];

// 미들웨어: 사용자 ID 유효성 검사
const validateUserId = (req, res, next) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
  }

  req.user = user;
  next();
};

// 모든 사용자 조회
router.get("/", (req, res) => {
  res.json(users);
});

// 특정 사용자 조회
router.get("/:id", validateUserId, (req, res) => {
  res.json(req.user);
});

// 사용자 프로필 조회
router.get("/:id/profile", validateUserId, (req, res) => {
  res.json({
    ...req.user,
    profile: {
      address: "서울시 강남구",
      phone: "010-1234-5678",
    },
  });
});

module.exports = router;
