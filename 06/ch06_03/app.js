const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
// const db = require("./db"); // 데이터베이스 연결
const Database = require("better-sqlite3");
// 데이터베이스 파일 생성/연결
const db = new Database("posts.db");

// GraphQL 스키마 정의
const schema = buildSchema(`
  type Post {
    id: ID!
    title: String!
    content: String!
  }

  input PostInput {
    title: String
    content: String
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
    // 기존 데이터 조회
    const getStmt = db.prepare("SELECT * FROM posts WHERE id = ?");
    const existingPost = getStmt.get(id);
    if (!existingPost) throw new Error("Post not found");

    // 업데이트할 값 결정 (입력된 값이 있으면 사용, 없으면 기존 값 사용)
    const title = input.title || existingPost.title;
    const content = input.content || existingPost.content;

    const stmt = db.prepare(
      "UPDATE posts SET title = ?, content = ? WHERE id = ?"
    );
    const info = stmt.run(title, content, id);
    if (info.changes === 0) throw new Error("Post not found");

    return { id, title, content };
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
