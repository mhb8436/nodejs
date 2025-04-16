const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
// const db = require("./db"); // 데이터베이스 연결
const Database = require("better-sqlite3");
// 데이터베이스 파일 생성/연결
const db = new Database("posts.db");

// 데이터베이스 테이블 생성
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    postId INTEGER NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY(postId) REFERENCES posts(id) ON DELETE CASCADE
  );
`);

// GraphQL 스키마 정의
const schema = buildSchema(`
  type Post {
    id: ID!
    title: String!
    content: String!
  }

  type Comment {
    id: ID!
    postId: ID!
    content: String!
  }

  input PostInput {
    title: String!
    content: String!
  }

  input CommentInput {
    postId: ID!
    content: String!
  }

  type Query {
    getPosts: [Post]
    getPost(id: ID!): Post
    getComments(postId: ID!): [Comment]
  }

  type Mutation {
    createPost(input: PostInput): Post
    updatePost(id: ID!, input: PostInput): Post
    deletePost(id: ID!): String
    createComment(input: CommentInput): Comment
    deleteComment(id: ID!): String
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

  getComments: ({ postId }) => {
    const stmt = db.prepare("SELECT * FROM comments WHERE postId = ?");
    return stmt.all(postId);
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

  createComment: ({ input }) => {
    const stmt = db.prepare(
      "INSERT INTO comments (postId, content) VALUES (?, ?)"
    );
    const info = stmt.run(input.postId, input.content);
    return { id: info.lastInsertRowid, ...input };
  },

  deleteComment: ({ id }) => {
    const stmt = db.prepare("DELETE FROM comments WHERE id = ?");
    const info = stmt.run(id);
    if (info.changes === 0) throw new Error("Comment not found");

    return `Comment with ID ${id} deleted`;
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
