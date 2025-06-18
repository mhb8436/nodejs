const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todos");

router.get("/", todoController.getAllTodos);
router.post("/", todoController.createTodo);
router.get("/:id", todoController.getTodo);
router.patch("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
