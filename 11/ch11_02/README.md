# API Key 인증 예제

이 예제는 Express.js에서 API Key를 사용한 인증 방식을 구현하는 방법을 보여줍니다.

## 주요 기능

- API Key를 사용한 엔드포인트 보호
- 커스텀 인증 미들웨어 구현
- 헤더 또는 쿼리 파라미터를 통한 API Key 전달

## 사용 방법

1. 서버 실행:

```bash
npm install
node app.js
```

2. API 테스트:

- URL: http://localhost:3000/protected
- API Key 전달 방법:
  - 헤더: `X-API-Key: your_api_key`
  - 또는 쿼리 파라미터: `?api_key=your_api_key`

## 의존성

- express
