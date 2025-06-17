# Express 미들웨어와 에러 처리

이 예제는 Express.js의 미들웨어 시스템과 에러 처리 방법을 설명합니다.

## 주요 학습 내용

1. 기본 미들웨어 사용

   - express.json()
   - express.urlencoded()
   - morgan (로깅)
   - cors (교차 출처 리소스 공유)
   - helmet (보안 헤더)

2. 커스텀 미들웨어 작성

   - 요청/응답 로거
   - 응답 시간 측정

3. 에러 처리
   - 커스텀 에러 클래스
   - 전역 에러 처리 미들웨어
   - 비동기 에러 처리
   - 404 에러 처리

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 모드로 실행
npm run dev

# 프로덕션 모드로 실행
npm start
```

## API 엔드포인트

- GET `/`: 서버 상태 확인
- GET `/error`: 동기 에러 발생 테스트
- GET `/async-error`: 비동기 에러 발생 테스트
- GET `/not-found`: 404 에러 테스트

## 프로젝트 구조

```
src/
  ├── middleware/
  │   ├── logger.js      # 커스텀 로거 미들웨어
  │   └── error-handler.js # 에러 처리 미들웨어
  └── app.js             # 메인 애플리케이션 파일
```

## 미들웨어 실행 순서

1. 기본 미들웨어 (express.json, express.urlencoded)
2. 로깅 미들웨어 (morgan)
3. 보안 미들웨어 (cors, helmet)
4. 커스텀 로거
5. 라우트 핸들러
6. 404 에러 핸들러
7. 에러 처리 미들웨어
