const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// EJS 템플릿 엔진 설정
app.set('view engine', 'ejs');
app.set('views', './views');

// 기본 라우트 설정
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Express and EJS Example', 
    message: 'Hello there!' });
});

app.get('/for', (req, res) => {
  res.render('for');
});

app.get('/if', (req, res) => {
  res.render('if');
});

const data = [
  {'title': 'Title # 1', 'content': 'This is Content 1'},
  {'title': 'Title # 2', 'content': 'This is Content 2'},
  {'title': 'Title # 3', 'content': 'This is Content 3'},
];
app.get('/sample', (req, res) => {
  res.render('sample', {data: data})
})

app.get('/test', (req, res) => {
  const result = fs.readFileSync(
    'test.json', 'utf-8');
  const data = JSON.parse(result);  
  res.render('test', {items: data["result"]})
});



// 서버 시작
app.listen(port, () => {
  console.log(`Server is running 
    at http://localhost:${port}`);
});

