const express = require('express');
const { engine } = require('express-handlebars')

const app = express();
const port = 3000;

// Handlebars 템플릿 엔진 설정
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// 기본 라우트 설정
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Express and Handlebars Example',
     message: 'Hello there!' });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running 
    at http://localhost:${port}`);
});
