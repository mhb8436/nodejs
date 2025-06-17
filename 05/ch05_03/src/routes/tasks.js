const express = require("express");
const router = express.Router();
const taskController = require("../controllers/tasks");
const validate = require("../middleware/validate");
const { createTaskSchema, updateTaskSchema } = require("../models/task");

// 작업 목록 조회
router.get("/", taskController.getAllTasks);

// 새 작업 생성
router.post("/", validate(createTaskSchema), taskController.createTask);

// 특정 작업 조회
router.get("/:id", taskController.getTask);

// 작업 수정
router.patch("/:id", validate(updateTaskSchema), taskController.updateTask);

// 작업 삭제
router.delete("/:id", taskController.deleteTask);

module.exports = router;
