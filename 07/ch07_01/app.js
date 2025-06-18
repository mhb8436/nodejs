const express = require("express");
const app = express();

// JSON 파싱 미들웨어
app.use(express.json());

// 메모리 데이터베이스 (예제용)
const posts = [
  {
    id: 1,
    title: "첫 번째 게시글",
    content: "안녕하세요!",
    author: "홍길동",
    createdAt: new Date("2024-01-01"),
    views: 0,
  },
];

// 게시글 목록 조회 (200 OK + 페이지네이션)
app.get("/api/posts", (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {
      posts: posts.slice(startIndex, endIndex),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(posts.length / limit),
        totalPosts: posts.length,
      },
    };

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "게시글 목록을 불러오는 중 오류가 발생했습니다.",
    });
  }
});

// 게시글 상세 조회 (200 OK or 404 Not Found)
app.get("/api/posts/:id", (req, res) => {
  try {
    const post = posts.find((p) => p.id === parseInt(req.params.id));

    if (!post) {
      return res.status(404).json({
        status: "fail",
        message: "게시글을 찾을 수 없습니다.",
      });
    }

    // 조회수 증가
    post.views += 1;

    res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "게시글을 불러오는 중 오류가 발생했습니다.",
    });
  }
});

// 게시글 작성 (201 Created)
app.post("/api/posts", (req, res) => {
  try {
    const { title, content, author } = req.body;

    // 입력값 검증
    if (!title || !content || !author) {
      return res.status(400).json({
        status: "fail",
        message: "제목, 내용, 작성자는 필수 입력 항목입니다.",
      });
    }

    const newPost = {
      id: posts.length + 1,
      title,
      content,
      author,
      createdAt: new Date(),
      views: 0,
    };

    posts.push(newPost);

    res.status(201).json({
      status: "success",
      data: newPost,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "게시글 작성 중 오류가 발생했습니다.",
    });
  }
});

// 게시글 수정 (200 OK or 404 Not Found)
app.put("/api/posts/:id", (req, res) => {
  try {
    const post = posts.find((p) => p.id === parseInt(req.params.id));

    if (!post) {
      return res.status(404).json({
        status: "fail",
        message: "게시글을 찾을 수 없습니다.",
      });
    }

    const { title, content } = req.body;

    // 입력값 검증
    if (!title || !content) {
      return res.status(400).json({
        status: "fail",
        message: "제목과 내용은 필수 입력 항목입니다.",
      });
    }

    // 게시글 업데이트
    post.title = title;
    post.content = content;
    post.updatedAt = new Date();

    res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "게시글 수정 중 오류가 발생했습니다.",
    });
  }
});

// 게시글 삭제 (204 No Content or 404 Not Found)
app.delete("/api/posts/:id", (req, res) => {
  try {
    const index = posts.findIndex((p) => p.id === parseInt(req.params.id));

    if (index === -1) {
      return res.status(404).json({
        status: "fail",
        message: "게시글을 찾을 수 없습니다.",
      });
    }

    posts.splice(index, 1);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "게시글 삭제 중 오류가 발생했습니다.",
    });
  }
});

// 존재하지 않는 엔드포인트 처리 (404 Not Found)
app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: "요청하신 엔드포인트를 찾을 수 없습니다.",
  });
});

// 전역 에러 처리 (500 Internal Server Error)
app.use((err, req, res, next) => {
  console.error("예상치 못한 에러:", err.stack);
  res.status(500).json({
    status: "error",
    message: "서버에서 예상치 못한 에러가 발생했습니다.",
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
