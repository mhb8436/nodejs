const TodoModel = require("../models/todo");

exports.getAllTodos = (req, res) => {
  const { status } = req.query;
  const todos = TodoModel.findAll(status);

  res.json({
    status: "success",
    data: {
      todos,
    },
  });
};

exports.getTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const todo = TodoModel.findById(id);

  if (!todo) {
    return res.status(404).json({
      status: "fail",
      message: "할 일을 찾을 수 없습니다.",
    });
  }

  res.json({
    status: "success",
    data: {
      todo,
    },
  });
};

exports.createTodo = (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({
      status: "fail",
      message: "제목은 필수 항목입니다.",
    });
  }

  const todo = TodoModel.create({ title, description });

  res.status(201).json({
    status: "success",
    data: {
      todo,
    },
  });
};

exports.updateTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const updates = req.body;

  const todo = TodoModel.update(id, updates);

  if (!todo) {
    return res.status(404).json({
      status: "fail",
      message: "할 일을 찾을 수 없습니다.",
    });
  }

  res.json({
    status: "success",
    data: {
      todo,
    },
  });
};

exports.deleteTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const deleted = TodoModel.delete(id);

  if (!deleted) {
    return res.status(404).json({
      status: "fail",
      message: "할 일을 찾을 수 없습니다.",
    });
  }

  res.status(204).send();
};
