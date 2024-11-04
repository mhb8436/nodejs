const express = require("express");
const postRoute = require("./routes/postRoute");
const models = require("./models");
const app = express();
const PORT = 3000;

app.use(express.json());
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
