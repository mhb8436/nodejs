const express = require("express");
const Database = require("better-sqlite3");
const path = require("path");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const db_name = path.join(__dirname, "post.db");
const db = new Database(db_name);
const app = express();
const PORT = 4000;
const create_sql = `
    CREATE TABLE if not exists posts(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title VARCHAR(255),
        content TEXT,
        author VARCHAR(100),
        createdAt datetime default current_timestamp,
        count integer default 0
    );

    CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL,
        postId INTEGER,
        FOREIGN KEY(postId) REFERENCES posts(id)
    );
`;
db.exec(create_sql);
// schema
const schema = buildSchema(`
    type Post {
        id: ID!
        title: String
        content: String
        author: String
        createdAt: String
    }

    input PostInput {
        title: String!
        content: String!
        author: String!
    }

    type Query {
        getPosts: [Post]
        getPost(id: ID!): Post
    }
    
    type Mutation {
        createPost(input: PostInput): Post
        updatePost(id: ID!, input:PostInput): Post
        deletePost(id: ID!): String
    }
`);

// resolver
const root = {
  getPosts: () => {
    const stmt = db.prepare(`select * from posts`);
    return stmt.all();
  },
  getPost: ({ id }) => {
    const stmt = db.prepare(`select * from posts where id = ? `);
    return stmt.get(id);
  },
  createPost: ({ input }) => {
    const stmt = db.prepare(
      `insert into posts(title, content,author) values(?,?,?)`
    );
    const info = stmt.run(input.title, input.content, input.author);
    return { id: info.lastInsertRowid, ...input };
  },
  updatePost: ({ id, input }) => {
    const stmt = db.prepare(`
        update posts set title = ?, content=? where id = ?
        `);
    const info = stmt.run(input.title, input.content, id);
    return { id, ...input };
  },
  deletePost: ({ id }) => {
    const stmt = db.prepare(`delete from posts where id = ?`);
    const info = stmt.run(id);
    return `Post[${id}] is deleted`;
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(PORT);
