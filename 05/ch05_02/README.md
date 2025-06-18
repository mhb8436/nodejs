# Express 라우터 모듈화

이 예제는 Express.js의 라우터를 모듈화하는 방법을 설명합니다.

## 주요 학습 내용

1. 라우터 모듈화

   - Express.Router 사용
   - 라우터 파일 분리
   - 라우터 마운팅

2. 라우트 구성

   - 기본 라우트
   - 매개변수 사용
   - 중첩 라우트
   - 쿼리 파라미터

3. API 버전 관리
   - URL 접두사 사용
   - 버전별 라우터 구성

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

### 사용자 API

- GET `/api/v1/users`: 모든 사용자 조회
- GET `/api/v1/users/:id`: 특정 사용자 조회
- GET `/api/v1/users/:id/profile`: 사용자 프로필 조회

### 게시물 API

- GET `/api/v1/posts`: 모든 게시물 조회
- GET `/api/v1/posts?userId=1`: 특정 사용자의 게시물 조회
- GET `/api/v1/posts/:id`: 특정 게시물 조회
- GET `/api/v1/posts/:id/comments`: 게시물의 댓글 조회

## 프로젝트 구조

```
src/
  ├── routes/
  │   ├── users.js    # 사용자 관련 라우터
  │   └── posts.js    # 게시물 관련 라우터
  └── app.js          # 메인 애플리케이션 파일
```

## 라우터 구성 특징

1. 모듈화된 라우터

   - 각 리소스별로 별도의 라우터 파일
   - 관심사 분리를 통한 코드 구조화

2. 미들웨어 활용

   - 라우터별 전용 미들웨어
   - 매개변수 검증

3. REST API 설계
   - 리소스 중심 URL 구조
   - HTTP 메서드 활용
   - 중첩 리소스 처리
