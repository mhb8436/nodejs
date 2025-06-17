const Joi = require("joi");

// 작업 상태 열거형
const TaskStatus = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE",
};

// 작업 생성 스키마
const createTaskSchema = Joi.object({
  title: Joi.string().required().min(3).max(100),
  description: Joi.string().required().min(10).max(1000),
  dueDate: Joi.date().iso().min("now").required(),
  priority: Joi.number().integer().min(1).max(5).required(),
});

// 작업 수정 스키마
const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().min(10).max(1000),
  dueDate: Joi.date().iso().min("now"),
  priority: Joi.number().integer().min(1).max(5),
  status: Joi.string().valid(...Object.values(TaskStatus)),
}).min(1);

// 가상의 데이터 저장소
let tasks = [
  {
    id: 1,
    title: "프로젝트 계획 수립",
    description: "새로운 프로젝트의 범위와 일정을 계획합니다.",
    dueDate: "2024-12-31",
    priority: 1,
    status: TaskStatus.TODO,
    createdAt: "2024-01-01T00:00:00.000Z",
  },
];

// 자동 증가 ID
let nextId = 2;

module.exports = {
  TaskStatus,
  createTaskSchema,
  updateTaskSchema,
  tasks,
  nextId,
};
