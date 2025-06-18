const request = require("supertest");
const app = require("../app");

describe("Todo API", () => {
  let createdTodoId;

  describe("GET /api/v1/todos", () => {
    it("should return all todos", async () => {
      const res = await request(app).get("/api/v1/todos").expect(200);

      expect(res.body.status).toBe("success");
      expect(Array.isArray(res.body.data.todos)).toBe(true);
    });

    it("should filter todos by status", async () => {
      const res = await request(app)
        .get("/api/v1/todos?status=pending")
        .expect(200);

      expect(res.body.status).toBe("success");
      res.body.data.todos.forEach((todo) => {
        expect(todo.status).toBe("pending");
      });
    });
  });

  describe("POST /api/v1/todos", () => {
    it("should create a new todo", async () => {
      const newTodo = {
        title: "테스트 할 일",
        description: "테스트를 위한 할 일입니다.",
      };

      const res = await request(app)
        .post("/api/v1/todos")
        .send(newTodo)
        .expect(201);

      expect(res.body.status).toBe("success");
      expect(res.body.data.todo.title).toBe(newTodo.title);
      expect(res.body.data.todo.status).toBe("pending");

      createdTodoId = res.body.data.todo.id;
    });

    it("should return 400 if title is missing", async () => {
      const newTodo = {
        description: "제목이 없는 할 일",
      };

      const res = await request(app)
        .post("/api/v1/todos")
        .send(newTodo)
        .expect(400);

      expect(res.body.status).toBe("fail");
    });
  });

  describe("GET /api/v1/todos/:id", () => {
    it("should return a specific todo", async () => {
      const res = await request(app)
        .get(`/api/v1/todos/${createdTodoId}`)
        .expect(200);

      expect(res.body.status).toBe("success");
      expect(res.body.data.todo.id).toBe(createdTodoId);
    });

    it("should return 404 for non-existent todo", async () => {
      const res = await request(app).get("/api/v1/todos/9999").expect(404);

      expect(res.body.status).toBe("fail");
    });
  });

  describe("PATCH /api/v1/todos/:id", () => {
    it("should update a todo", async () => {
      const updates = {
        title: "수정된 할 일",
        status: "completed",
      };

      const res = await request(app)
        .patch(`/api/v1/todos/${createdTodoId}`)
        .send(updates)
        .expect(200);

      expect(res.body.status).toBe("success");
      expect(res.body.data.todo.title).toBe(updates.title);
      expect(res.body.data.todo.status).toBe(updates.status);
    });
  });

  describe("DELETE /api/v1/todos/:id", () => {
    it("should delete a todo", async () => {
      await request(app).delete(`/api/v1/todos/${createdTodoId}`).expect(204);

      // 삭제 확인
      await request(app).get(`/api/v1/todos/${createdTodoId}`).expect(404);
    });
  });
});
