const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
// import router from routes
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const authRoute = require("./routes/authRoute");

const models = require("./models"); // models/index.js
// models <= db
const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: "http://localhost:3000", // React 앱 주소
    methods: ["GET", "POST", "PUT", "DELETE"], // 허용할 HTTP 메서드
    credentials: true, // 쿠키, 인증 정보를 포함하려면 설정
  })
);

app.use(express.json());
// use router
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/auth", authRoute);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
  models.sequelize
    .sync({ force: false }) // 모델을 테이블로 생성 force: false 면 if not exists
    .then(() => {
      // 모델 생성 성공 시, db 객체 연결 성공시
      console.log(`db connected`);
    })
    .catch((err) => {
      // 모델 생성 실패 시 ,db 객체 연결 실패시
      console.error(`db connected error : ${err}`);
      process.exit();
    });
});
