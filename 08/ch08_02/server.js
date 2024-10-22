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

app.get("/boards", async (req, res) => {
  const boards = await models.Board.findAll();
  console.log(`All boards : ${boards}`);
  res.json(boards);
});

app.post("/boards", upload.single("file"), async (req, res) => {
  console.log(req.body);
  const { title, content } = req.body;
  let filename = req.file ? req.file.filename : null;
  filename = `/downloads/${filename}`;

  const board = await models.Board.create({
    title: title,
    content: content,
    filename: filename,
    writer: "Tester",
    wirte_date: Date.now(),
  });
  res.status(201).json(board);
});

app.put("/boards/:id", upload.single("file"), async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  let filename = req.file ? req.file.filename : null;
  filename = `/downloads/${filename}`;

  const board = await models.Board.findByPk(req.params.id);
  if (board) {
    board.title = title;
    board.content = content;
    if (filename) {
      board.filename = filename;
    }
    await board.save();
    res.json(board);
  } else {
    res.status(404).send("Board not found");
  }
});

app.get("/boards/:id", async (req, res) => {
  const id = req.params.id;
  const board = await models.Board.findByPk(req.params.id);
  if (board) {
    res.json(board);
  } else {
    res.status(404), send("Board not found");
  }
});

app.delete("/boards/:id", async (req, res) => {
  const result = await models.Board.destroy({
    where: { id: req.params.id },
  });

  if (result) {
    res.status(204).send();
  } else {
    res.status(404).send("Board not found");
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
