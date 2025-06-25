const express = require("express");
const fs = require("fs");
const path = require("path");
const models = require("./models");
const multer = require("multer");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/downloads", express.static(path.join(__dirname, "public/uploads")));
const upload_dir = `public/uploads`;

const storage = multer.diskStorage({
  destination: `./${upload_dir}`,
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.get("/posts", async (req, res) => {
  try {
    // 페이징 파라미터 처리
    const page = parseInt(req.query.page) || 1; // 현재 페이지 (기본값: 1)
    const pageSize = parseInt(req.query.pageSize) || 10; // 페이지 크기 (기본값: 10)
    const offset = (page - 1) * pageSize; // 건너뛰어야 할 데이터 수

    // 정렬 파라미터 처리
    const sortField = req.query.sortField || "createdAt"; // 정렬 필드 (기본값: createdAt)
    const sortOrder = req.query.sortOrder === "asc" ? "ASC" : "DESC"; // 정렬 순서 (기본값: DESC)

    // 게시물 총 개수 조회
    const totalPosts = await models.Post.count();

    // 페이징된 게시물 목록 조회
    const posts = await models.Post.findAll({
      include: [
        {
          model: models.User,
          as: "author",
          attributes: ["id", "name", "email"],
        },
      ],
      order: [[sortField, sortOrder]],
      limit: pageSize,
      offset: offset,
    });

    // 페이징 메타데이터 계산
    const totalPages = Math.ceil(totalPosts / pageSize);

    // 응답 데이터 구성
    const response = {
      posts,
      pagination: {
        currentPage: page,
        pageSize,
        totalItems: totalPosts,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };

    console.log(
      `페이지 ${page}/${totalPages}, 총 ${totalPosts}개 게시물 중 ${posts.length}개 조회`
    );
    res.json(response);
  } catch (error) {
    console.error("게시물 목록 조회 오류:", error);
    res.status(500).send("게시물 목록 조회 중 오류가 발생했습니다.");
  }
});

app.post("/posts", upload.single("file"), async (req, res) => {
  console.log(req.body);
  const { title, content } = req.body;
  let filename = req.file ? req.file.filename : null;
  filename = `/downloads/${filename}`;

  const post = await models.Post.create({
    title: title,
    content: content,
    filename: filename,
    author_id: 1, // 기본값으로 1번 사용자를 작성자로 설정
    write_date: Date.now(),
  });
  res.status(201).json(post);
});

app.put("/posts/:id", upload.single("file"), async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  let filename = req.file ? req.file.filename : null;
  filename = `/downloads/${filename}`;

  const post = await models.Post.findByPk(req.params.id);
  if (post) {
    post.title = title;
    post.content = content;
    if (filename) {
      post.filename = filename;
    }
    await post.save();
    res.json(post);
  } else {
    res.status(404).send("Post not found");
  }
});

app.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const post = await models.Post.findByPk(req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404), send("Post not found");
  }
});

app.delete("/posts/:id", async (req, res) => {
  const result = await models.Post.destroy({
    where: { id: req.params.id },
  });

  if (result) {
    res.status(204).send();
  } else {
    res.status(404).send("Post not found");
  }
});

// 댓글 관련 API 엔드포인트

// 특정 게시물의 댓글 목록 조회
app.get("/posts/:postId/comments", async (req, res) => {
  const postId = req.params.postId;

  try {
    const comments = await models.Comment.findAll({
      where: { post_id: postId },
      include: [
        {
          model: models.User,
          as: "author",
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["created_at", "DESC"]],
    });

    res.json(comments);
  } catch (error) {
    console.error("댓글 조회 오류:", error);
    res.status(500).send("댓글 조회 중 오류가 발생했습니다.");
  }
});

// 새 댓글 작성
app.post("/posts/:postId/comments", async (req, res) => {
  const postId = req.params.postId;
  const { content, userId } = req.body;

  try {
    // 게시물 존재 확인
    const post = await models.Post.findByPk(postId);
    if (!post) {
      return res.status(404).send("게시물을 찾을 수 없습니다.");
    }

    // 댓글 생성
    const comment = await models.Comment.create({
      content,
      post_id: postId,
      user_id: userId || 1, // 기본값으로 1번 사용자 설정
      is_approved: true,
      created_at: new Date(),
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error("댓글 생성 오류:", error);
    res.status(500).send("댓글 생성 중 오류가 발생했습니다.");
  }
});

// 댓글 수정 - REST 표준에 맞게 수정
app.put("/posts/:postId/comments/:id", async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;
  const { content } = req.body;

  try {
    // 게시물 존재 확인
    const post = await models.Post.findByPk(postId);
    if (!post) {
      return res.status(404).send("게시물을 찾을 수 없습니다.");
    }

    // 해당 게시물의 댓글인지 확인
    const comment = await models.Comment.findOne({
      where: {
        id: commentId,
        post_id: postId,
      },
    });

    if (!comment) {
      return res
        .status(404)
        .send("해당 게시물에 속한 댓글을 찾을 수 없습니다.");
    }

    comment.content = content;
    await comment.save();

    res.json(comment);
  } catch (error) {
    console.error("댓글 수정 오류:", error);
    res.status(500).send("댓글 수정 중 오류가 발생했습니다.");
  }
});

// 댓글 삭제 - REST 표준에 맞게 수정
app.delete("/posts/:postId/comments/:id", async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;

  try {
    // 게시물 존재 확인
    const post = await models.Post.findByPk(postId);
    if (!post) {
      return res.status(404).send("게시물을 찾을 수 없습니다.");
    }

    // 해당 게시물의 댓글만 삭제
    const result = await models.Comment.destroy({
      where: {
        id: commentId,
        post_id: postId,
      },
    });

    if (result) {
      res.status(204).send();
    } else {
      res.status(404).send("해당 게시물에 속한 댓글을 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("댓글 삭제 오류:", error);
    res.status(500).send("댓글 삭제 중 오류가 발생했습니다.");
  }
});

app.listen(3000, () => {
  console.log(`Server will be start..`);
  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log(`DB 연결 성공`);
    })
    .catch((err) => {
      console.error(`DB 연결 에러 : ${err}`);
      process.exit();
    });
});
console.log(`Server is listening on port 3000`);
