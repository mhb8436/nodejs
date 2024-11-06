const express = require('express');
const fs = require('fs');
const path = require('path');
const userRouter = require('./routes/userRoutes');
const boardRouter = require('./routes/boardRoutes');
const authRouter = require('./routes/authRoutes');

const models = require('./models');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Server will be start..`);
    models.sequelize.sync({force:false}).then(()=> { // 모ㄹ을 
        console.log(`DB 연결 성공`);
    }).catch((err) => {
        console.error(`DB 연결 에러 : ${err}`);
        process.exit();
    });
});
console.log(`Server is listening on port 3000`);
