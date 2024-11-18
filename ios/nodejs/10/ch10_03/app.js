const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const postRoute = require("./routes/postRoute");
const models = require("./models");
const app = express();
const PORT = 3002;

app.use(express.json());

// Swagger 설정
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "게시판 API",
    version: "1.0.0",
    description: "게시판 API 문서",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // API 명세가 있는 파일 경로
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/posts", postRoute);
// app.use("/users", userRoute);
// app.use("/comments", commentRoute);
// app.use("/products", productRoute);

app.listen(PORT, () => {
  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("DB 연결 성공");
    })
    .catch((err) => {
      console.error(`DB 연결 실패 : ${err}`);
      process.exit();
    });
});
