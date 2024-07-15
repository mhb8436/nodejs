const express = require('express');
const basicAuth = require('express-basic-auth');

const app = express();

// 기본 인증 미들웨어 설정
app.use(basicAuth({
  users: { 'admin': 'supersecret' }, // 사용자 이름과 비밀번호 설정
  unauthorizedResponse: '인증이 실패했습니다.'
}));

// 보호된 API 엔드포인트
app.get('/protected', (req, res) => {
  res.json({ message: '기본 인증으로 보호된 데이터에 접근하였습니다.' });
});

// 서버 시작
app.listen(3000, () => {
  console.log('서버가 http://localhost:3000 포트에서 실행 중입니다.');
});

