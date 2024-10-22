const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/facebook");

const db = mongoose.connection;

db.on("error", (err) => {
  console.error(`db connect error : ${err}`);
});

db.once("open", () => {
  console.log(`Database connected successfully `);
});

const BoardSchema = new mongoose.Schema({
  title: String,
  content: String,
  writer: String,
  write_date: { type: Date, default: Date.now },
  comments: [
    {
      comment: String,
      user: String,
      created_at: { type: Date, default: Date.now },
    },
  ],
});

const Board = mongoose.model("Board", BoardSchema);

const app = express();
app.use(express.json());

app.post("/boards", async (req, res) => {
  const { title, content, writer } = req.body;

  try {
    const board = new Board({
      title: title,
      content: content,
      writer: writer,
    });
    board.save();
    res.status(200).json(board);
  } catch (error) {
    console.error(`post error : ${error}`);
    res.status(200).json({ error: error });
  }
});

app.get("/boards", async (req, res) => {
  try {
    const boards = await Board.find({});
    res.json(boards);
  } catch (error) {
    console.error(`get error : ${error}`);
    res.status(200).json({ error: error });
  }
});

app.get("/boards/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const boards = await Board.findById(id);
    res.json(boards);
  } catch (error) {
    console.error(`get error : ${error}`);
    res.status(200).json({ error: error });
  }
});

app.put("/boards/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const board = await Board.findByIdAndUpdate(
      id,
      {
        title,
        content,
      },
      { new: true }
    );
    res.status(200).json(board);
  } catch (error) {
    console.error(`put error : ${error}`);
    res.status(200).json({ error: error });
  }
});

app.delete("/boards/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const board = await Board.findByIdAndDelete(id);
    res.status(200).json(board);
  } catch (error) {
    console.error(`put error : ${error}`);
    res.status(200).json({ error: error });
  }
});

app.listen(3000, () => {
  console.log(`Server started on port 3000`);
});
