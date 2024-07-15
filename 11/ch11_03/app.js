const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = 'your_secret_key';
app.use(express.urlencoded({extended: true}));

// 토큰 발급하는 라우트 (로그인)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // 실제로는 데이터베이스에서 사용자 인증을 수행합니다.
  if (username === 'admin' && password === 'password') {
    const accessToken = jwt.sign({ username }, secretKey, { expiresIn: '30m' });
    res.json({ accessToken });
  } else {
    res.status(401).json({ error: '인증 실패' });
  }
});

// JWT 토큰 검증 미들웨어
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer token 형식에서 토큰 추출

  if (!token) {
    return res.status(401).json({ error: '인증되지 않은 사용자' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: '토큰 만료 또는 유효하지 않음' });
    }
    req.user = user;
    next();
  });
}

// 보호된 라우트
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'JWT 토큰으로 보호된 데이터에 접근하였습니다.', user: req.user });
});

// 서버 시작
app.listen(3000, () => {
  console.log('서버가 http://localhost:3000 포트에서 실행 중입니다.');
});
