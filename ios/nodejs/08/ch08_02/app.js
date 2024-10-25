const express = require("express");
const path = require("path");
const models = require("./models");

const app = express();
const PORT = 3000;
app.use(express.json());

app.post("/posts", async (req, res) => {
  const { title, content, author } = req.body;
  const post = await models.Post.create({
    title: title,
    content: content,
    author: author,
  });
  res.status(201).json(post);
});

app.get("/posts", async (req, res) => {
  const posts = await models.Post.findAll({
    include: [{ model: models.Comment }],
  });
  res.status(200).json({ data: posts });
});

app.post("/posts/:id/comments", async (req, res) => {
  const { content } = req.body;
  const postId = req.params.id;

  const comment = await models.Comment.create({
    PostId: postId,
    content: content,
  });
  res.status(201).json(comment);
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
