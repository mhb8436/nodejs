const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const Database = require("better-sqlite3");
const path = require("path");

// 데이터베이스 연결
const db_name = path.join(__dirname, "todo.db");
const db = new Database(db_name);

// GraphQL 스키마 정의
const schema = buildSchema(`
  type Todo {
    id: ID!
    task: String!
    description: String!
    completed: Boolean!
    createdAt: String!
    priority: Int!
  }

  input TodoInput {
    task: String!
    description: String!
    priority: Int
  }

  input TodoUpdateInput {
    task: String
    description: String
    completed: Boolean
    priority: Int
  }

  type Query {
    getTodos: [Todo]
    getTodo(id: ID!): Todo
  }

  type Mutation {
    createTodo(input: TodoInput): Todo
    updateTodo(id: ID!, input: TodoUpdateInput): Todo
    deleteTodo(id: ID!): String
  }
`);

// 리졸버 함수 정의
const root = {
  getTodos: () => {
    const stmt = db.prepare(
      "SELECT * FROM todos ORDER BY priority DESC, createdAt DESC"
    );
    return stmt.all();
  },

  getTodo: ({ id }) => {
    const stmt = db.prepare("SELECT * FROM todos WHERE id = ?");
    return stmt.get(id);
  },

  createTodo: ({ input }) => {
    const stmt = db.prepare(
      "INSERT INTO todos (task, description, priority) VALUES (?, ?, ?)"
    );
    const info = stmt.run(input.task, input.description, input.priority || 1);
    return {
      id: info.lastInsertRowid,
      ...input,
      completed: false,
      createdAt: new Date().toISOString(),
    };
  },

  updateTodo: ({ id, input }) => {
    const currentTodo = db.prepare("SELECT * FROM todos WHERE id = ?").get(id);
    if (!currentTodo) throw new Error("Todo not found");

    const updatedTodo = {
      ...currentTodo,
      ...input,
    };

    const stmt = db.prepare(
      "UPDATE todos SET task = ?, description = ?, completed = ?, priority = ? WHERE id = ?"
    );
    stmt.run(
      updatedTodo.task,
      updatedTodo.description,
      updatedTodo.completed,
      updatedTodo.priority,
      id
    );

    return updatedTodo;
  },

  deleteTodo: ({ id }) => {
    const stmt = db.prepare("DELETE FROM todos WHERE id = ?");
    const info = stmt.run(id);
    if (info.changes === 0) throw new Error("Todo not found");

    return `Todo with ID ${id} deleted`;
  },
};

// Express 서버 설정
const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // GraphiQL 인터페이스 활성화
  })
);

app.listen(4000, () =>
  console.log(
    "GraphQL 서버가 http://localhost:4000/graphql 에서 실행 중입니다."
  )
);
