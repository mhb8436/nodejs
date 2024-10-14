const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const db = require("./db"); // 데이터베이스 연결

// GraphQL 스키마 정의
const schema = buildSchema(`
  type Post {
    id: ID!
    title: String!
    content: String!
  }

  input PostInput {
    title: String!
    content: String!
  }

  type Query {
    getPosts: [Post]
    getPost(id: ID!): Post
  }

  type Mutation {
    createPost(input: PostInput): Post
    updatePost(id: ID!, input: PostInput): Post
    deletePost(id: ID!): String
  }
`);

// 리졸버 함수 정의
const root = {
  getPosts: () => {
    const stmt = db.prepare("SELECT * FROM posts");
    return stmt.all();
  },

  getPost: ({ id }) => {
    const stmt = db.prepare("SELECT * FROM posts WHERE id = ?");
    return stmt.get(id);
  },

  createPost: ({ input }) => {
    const stmt = db.prepare("INSERT INTO posts (title, content) VALUES (?, ?)");
    const info = stmt.run(input.title, input.content);
    return { id: info.lastInsertRowid, ...input };
  },

  updatePost: ({ id, input }) => {
    const stmt = db.prepare(
      "UPDATE posts SET title = ?, content = ? WHERE id = ?"
    );
    const info = stmt.run(input.title, input.content, id);
    if (info.changes === 0) throw new Error("Post not found");

    return { id, ...input };
  },

  deletePost: ({ id }) => {
    const stmt = db.prepare("DELETE FROM posts WHERE id = ?");
    const info = stmt.run(id);
    if (info.changes === 0) throw new Error("Post not found");

    return `Post with ID ${id} deleted`;
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
