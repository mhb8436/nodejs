const express = require("express");
const path = require("path");
const models = require("./models"); // models/index.js  models = db;
const multer = require("multer"); // added

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extends: true })); // added applicatioin/x-www-form-urlencoded
app.use("/downloads", express.static(path.join(__dirname, "public/uploads"))); // added
// http://localhost:3000/downloads/test.text -> public/uploads/test.text

const upload_dir = `public/uploads`;
const storage = multer.diskStorage({
  destination: `./${upload_dir}`, // ./public/uploads/
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name + // test
        "-" +
        Date.now() +
        path.extname(file.originalname) // .png
    );
  }, // test.png -> test-202410201010.png
});

const upload = multer({ storage: storage });

app.post("/posts", upload.single("file"), async (req, res) => {
  const { title, content, author } = req.body;
  let filename = req.file ? req.file.filename : null; // added
  filename = `/downloads/${filename}`; // test.png test-20241010101.png
  const post = await models.Post.create({
    title: title,
    content: content,
    author: author,
    filename: filename,
  });
  res.status(201).json(post);
});

app.get("/posts", async (req, res) => {
  const posts = await models.Post.findAll({
    include: [
      {
        model: models.Comment,
      },
    ],
  });
  // select * from posts;
  res.json({ data: posts });
});

app.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const post = await models.Post.findByPk(id);
  if (post) {
    res.status(200).json({ data: post });
  } else {
    res.status(404).json({ result: "post not found" });
  }
});

app.put("/posts/:id", upload.single("file"), async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  const post = await models.Post.findByPk(id);
  let filename = req.file ? req.file.filename : null;
  filename = `/downloads/${filename}`;
  if (post) {
    post.title = title;
    post.content = content;
    if (req.file) {
      post.filename = filename;
    }
    await post.save();
    res.status(200).json({ data: post });
  } else {
    res.status(405).json({ result: "not found post" });
  }
});

app.delete("/posts/:id", async (req, res) => {
  // delete from posts;
  // models.Post.destroyAll()
  // models.Post.truncate();
  const result = await models.Post.destroy({
    where: {
      id: req.params.id,
    },
  });
  console.log(`destroy result : ${result}`);
  if (result) {
    res.status(204).send();
  } else {
    res.status(404).json({ result: "not found post" });
  }
});

app.post("/posts/:id/comments", async (req, res) => {
  const postId = req.params.id; // Post의 ID
  const { content } = req.body;
  const comment = await models.Comment.create({
    PostId: postId,
    content: content,
  });
  res.status(201).json({ data: comment });
});

app.get("/posts/:id/comments", async (req, res) => {
  const postId = req.params.id;
  const comments = await models.Comment.findAll({
    include: [{ model: models.Post }],
    where: {
      PostId: postId,
    },
  });
  res.status(200).json({ data: comments });
});

app.put("/comments/:id", async (req, res) => {
  const id = req.params.id; // comment id
  const { content } = req.body;
  const comment = await models.Comment.findByPk(id);
  if (comment) {
    comment.content = content;
    await comment.save();
    res.json({ data: comment });
  } else {
    res.status(404).json({ result: "comment is not found" });
  }
});

app.delete("/comments/:id", async (req, res) => {
  const id = req.params.id;
  const result = await models.Comment.destroy({
    where: { id: id },
  });
  if (result) {
    res.status(204).send();
  } else {
    res.status(404).json({ result: "not found comments" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log(`DB connected`);
    })
    .catch((err) => {
      console.error(`DB error : ${err}`);
      process.exit();
    });
});
