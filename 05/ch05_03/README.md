# REST API 설계 기초

이 예제는 REST API 설계의 기본 원칙과 구현 방법을 설명합니다.

## 주요 학습 내용

1. REST API 설계 원칙

   - 리소스 중심 설계
   - HTTP 메서드의 올바른 사용
   - 상태 코드의 적절한 활용
   - 응답 형식 표준화

2. 데이터 유효성 검사

   - Joi를 사용한 스키마 정의
   - 유효성 검사 미들웨어
   - 에러 응답 표준화

3. API 버전 관리
   - URL 기반 버전 관리
   - 응답 형식 일관성

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

### 작업 관리 API

- GET `/api/v1/tasks`: 작업 목록 조회
  - 쿼리 파라미터:
    - status: 작업 상태로 필터링 (TODO, IN_PROGRESS, DONE)
    - priority: 우선순위로 필터링 (1-5)
- POST `/api/v1/tasks`: 새 작업 생성
- GET `/api/v1/tasks/:id`: 특정 작업 조회
- PATCH `/api/v1/tasks/:id`: 작업 수정
- DELETE `/api/v1/tasks/:id`: 작업 삭제

## 프로젝트 구조

```
src/
  ├── models/
  │   └── task.js         # 작업 모델과 유효성 검사 스키마
  ├── controllers/
  │   └── tasks.js        # 작업 관련 컨트롤러
  ├── routes/
  │   └── tasks.js        # 작업 관련 라우터
  ├── middleware/
  │   └── validate.js     # 유효성 검사 미들웨어
  └── app.js              # 메인 애플리케이션 파일
```

## API 응답 형식

### 성공 응답

```json
{
  "status": "success",
  "data": {
    "task": {
      "id": 1,
      "title": "프로젝트 계획 수립",
      "description": "새로운 프로젝트의 범위와 일정을 계획합니다.",
      "dueDate": "2024-12-31",
      "priority": 1,
      "status": "TODO",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### 실패 응답

```json
{
  "status": "fail",
  "message": "유효하지 않은 요청 데이터입니다.",
  "errors": [
    {
      "field": "title",
      "message": "제목은 최소 3글자 이상이어야 합니다."
    }
  ]
}
```

## REST API 설계 원칙

1. 리소스 명명 규칙

   - 명사 사용
   - 복수형 사용
   - 소문자와 하이픈 사용

2. HTTP 메서드 사용

   - GET: 리소스 조회
   - POST: 새 리소스 생성
   - PATCH: 리소스 부분 수정
   - DELETE: 리소스 삭제

3. 상태 코드 사용
   - 200: 성공
   - 201: 생성 성공
   - 204: 삭제 성공
   - 400: 잘못된 요청
   - 404: 리소스 없음
   - 500: 서버 에러
