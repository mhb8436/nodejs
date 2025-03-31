# Basic Authentication 예제

이 예제는 Express.js에서 Basic Authentication을 구현하는 방법을 보여줍니다.

## 주요 기능

- Basic Authentication을 사용한 API 엔드포인트 보호
- 사용자 인증 미들웨어 구현
- 보호된 리소스 접근 제어

## 사용 방법

1. 서버 실행:

```bash
npm install
node app.js
```

2. API 테스트:

- URL: http://localhost:3000/protected
- 인증 정보:
  - Username: admin
  - Password: supersecret

## 의존성

- express
- express-basic-auth
