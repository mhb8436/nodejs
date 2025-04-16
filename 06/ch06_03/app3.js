const express = require("express");
const moment = require("moment");
const Database = require("better-sqlite3");
const path = require("path");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { exitCode } = require("process");
const db = new Database("post3.db");

// posts 테이블 생성 SQL
const create_sql = `
    CREATE TABLE if not exists posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,  -- 게시글 ID (자동 증가)
        title VARCHAR(255),                    -- 게시글 제목
        content TEXT,                          -- 게시글 내용
        author TEXT,                           -- 작성자
        createdAt DATETIME default current_timestamp, -- 생성 시간 (기본값: 현재 시간)
        count INTEGER default 0                -- 조회수 (기본값: 0)
    );

    CREATE TABLE IF NOT EXISTS COMMENTS (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
       postId INTEGER,
        author TEXT,
        content TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (postId) REFERENCES POSTS(id)
    );
`;

db.exec(create_sql); // 테이블 생성 실행

const schema = buildSchema(`
    type Post {
        id: ID!
        title: String!
        content: String!
    }

    type Comment {
        id: ID!
        postId: ID
        content: String
    }

    input PostInput {
        title: String
        content: String
    }

    input CommentInput {
        postId: ID
        content: String
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
        createComment(postId: ID!, input: CommentInput): Comment
    }
`);
const root = {
  getPosts: () => {
    const stmt = db.prepare(`SELECT * FROM POSTS`);
    return stmt.all();
  },
  getPosts: ({ id }) => {
    const stmt = db.prepare(`SELECT * FROM POSTS WHERE ID = ?`);
    return stmt.get(id);
  },
  createPost: ({ input }) => {
    const stmt = db.prepare(`INSERT INTO POSTS (TITLE, CONTENT) VALUES(?, ?)`);
    const result = stmt.run(input.title, input.content);
    return { id: result.lastInsertRowid, ...input };
  },
  updatePost: ({ id, input }) => {
    const getStmt = db.prepare(`SELECT * FROM POSTS WHERE ID = ?`);
    const existsPost = getStmt.get(id);

    if (!existsPost) throw new Error(`Post not found`);

    const title = input.title || existsPost.title;
    const content = input.content || existsPost.content;

    const stmt = db.prepare(
      `UPDATE POSTS SET TITLE = ?, CONTENT = ? WHERE ID = ?`
    );
    const result = stmt.run(title, content, id);
    return { id, title, content };
  },
  deletePost: ({ id }) => {
    const stmt = db.prepare(`DELETE FROM POSTS WHERE ID = ?`);
    const result = stmt.run(id);
    return { message: "DELETE 완료" };
  },

  getComments: ({ postId }) => {
    const stmt = db.prepare(`SELECT * FROM COMMENTS WHERE POSTID = ?`);
    const result = stmt.all(postId);
    return result;
  },
  createComment: ({ postId, input }) => {
    const stmt = db.prepare(
      `INSERT INTO COMMENTS (POSTID, CONTENT) VALUES(?, ?)`
    );
    const result = stmt.run(postId, input.content);
    return { id: result.lastInsertRowid, ...input };
  },
};

// Express 서버 설정
const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4002, () => {
  console.log(`server is running on 4002`);
});
