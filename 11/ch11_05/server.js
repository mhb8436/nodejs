const express = require("express");
const fs = require("fs");
const path = require("path");
const userRouter = require("./routes/userRoutes");
const boardRouter = require("./routes/boardRoutes");
const authRouter = require("./routes/authRoutes");
const {
  loggingMiddleware,
  errorLoggingMiddleware,
} = require("./middleware/logger");
// 일반 로깅 미들웨어는 다른 미들웨어보다 먼저 등록해야 모든 요청을 로깅할 수 있습니다
app.use(loggingMiddleware);

const models = require("./models");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/users", userRouter);
app.use("/boards", boardRouter);
app.use("/auth", authRouter);

// 에러 로깅 미들웨어는 다른 모든 미들웨어 이후에 등록해야 합니다
app.use(errorLoggingMiddleware);

app.listen(PORT, () => {
  console.log(`Server will be start..`);
  models.sequelize
    .sync({ force: false })
    .then(() => {
      // 모ㄹ을
      console.log(`DB 연결 성공`);
    })
    .catch((err) => {
      console.error(`DB 연결 에러 : ${err}`);
      process.exit();
    });
});
console.log(`Server is listening on port 3000`);
