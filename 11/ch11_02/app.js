const express = require('express');

const app = express();
const apiKey = 'your_api_key';

// API 키 검증 미들웨어
function authenticateApiKey(req, res, next) {
  const providedKey = req.headers['x-api-key'] || req.query.api_key;

  if (!providedKey || providedKey !== apiKey) {
    return res.status(401).json({ error: '유효하지 않은 API 키' });
  }

  next();
}

// 보호된 라우트
app.get('/protected', authenticateApiKey, (req, res) => {
  res.json({ message: 'API 키로 보호된 데이터에 접근하였습니다.' });
});

// 서버 시작
app.listen(3000, () => {
  console.log('서버가 http://localhost:3000 포트에서 실행 중입니다.');
});


