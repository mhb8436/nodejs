// 가상의 데이터 저장소
let todos = [
  {
    id: 1,
    title: "보고서 작성하기",
    description: "프로젝트 진행 상황 보고서 작성",
    status: "pending",
    createdAt: "2024-01-01T00:00:00.000Z",
  },
];

// 자동 증가 ID
let nextId = 2;

class TodoModel {
  static findAll(status = null) {
    if (status) {
      return todos.filter((todo) => todo.status === status);
    }
    return todos;
  }

  static findById(id) {
    return todos.find((todo) => todo.id === id);
  }

  static create(data) {
    const todo = {
      id: nextId++,
      ...data,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    todos.push(todo);
    return todo;
  }

  static update(id, data) {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) return null;

    todos[index] = { ...todos[index], ...data };
    return todos[index];
  }

  static delete(id) {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) return false;

    todos.splice(index, 1);
    return true;
  }
}

module.exports = TodoModel;
