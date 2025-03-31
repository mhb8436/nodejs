# JWT 인증 예제

이 예제는 Express.js에서 JWT(JSON Web Token)를 사용한 인증 방식을 구현하는 방법을 보여줍니다.

## 주요 기능

- JWT 기반 인증 시스템
- 토큰 발급 및 검증
- 보호된 리소스 접근 제어
- 토큰 만료 처리

## 사용 방법

1. 서버 실행:

```bash
npm install
node app.js
```

2. API 테스트:

a. 로그인하여 토큰 발급:

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=admin&password=password"
```

b. 보호된 리소스 접근:

```bash
curl http://localhost:3000/protected \
  -H "Authorization: Bearer {발급받은_토큰}"
```

## 의존성

- express
- jsonwebtoken
