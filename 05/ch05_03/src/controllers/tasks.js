const { tasks, nextId, TaskStatus } = require("../models/task");

// 모든 작업 조회
exports.getAllTasks = (req, res) => {
  const { status, priority } = req.query;

  let filteredTasks = [...tasks];

  // 상태로 필터링
  if (status) {
    filteredTasks = filteredTasks.filter((task) => task.status === status);
  }

  // 우선순위로 필터링
  if (priority) {
    filteredTasks = filteredTasks.filter(
      (task) => task.priority === parseInt(priority)
    );
  }

  res.json({
    status: "success",
    data: {
      tasks: filteredTasks,
    },
  });
};

// 특정 작업 조회
exports.getTask = (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));

  if (!task) {
    return res.status(404).json({
      status: "fail",
      message: "작업을 찾을 수 없습니다.",
    });
  }

  res.json({
    status: "success",
    data: {
      task,
    },
  });
};

// 새 작업 생성
exports.createTask = (req, res) => {
  const newTask = {
    id: nextId++,
    ...req.body,
    status: TaskStatus.TODO,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);

  res.status(201).json({
    status: "success",
    data: {
      task: newTask,
    },
  });
};

// 작업 수정
exports.updateTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: "작업을 찾을 수 없습니다.",
    });
  }

  const updatedTask = {
    ...tasks[taskIndex],
    ...req.body,
    id: taskId, // ID는 변경 불가
  };

  tasks[taskIndex] = updatedTask;

  res.json({
    status: "success",
    data: {
      task: updatedTask,
    },
  });
};

// 작업 삭제
exports.deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: "작업을 찾을 수 없습니다.",
    });
  }

  tasks.splice(taskIndex, 1);

  res.status(204).send();
};
