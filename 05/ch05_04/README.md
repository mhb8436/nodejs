# API 개발 도구와 문서화

이 예제는 API 개발에 필요한 도구 사용법과 문서화 방법을 설명합니다.

## 주요 학습 내용

1. API 문서화

   - OpenAPI/Swagger 사용
   - YAML 형식으로 API 명세 작성
   - Swagger UI로 문서 제공

2. API 테스트

   - Jest 테스트 프레임워크
   - Supertest로 HTTP 테스트
   - 통합 테스트 작성

3. API 응답 표준화
   - 일관된 응답 형식
   - 적절한 HTTP 상태 코드
   - 에러 처리 표준화

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 모드로 실행
npm run dev

# 테스트 실행
npm test

# 프로덕션 모드로 실행
npm start
```

## API 문서

서버 실행 후 다음 URL에서 API 문서를 확인할 수 있습니다:
http://localhost:3000/api-docs

## API 엔드포인트

### 할 일 관리 API

- GET `/api/v1/todos`: 할 일 목록 조회
  - 쿼리 파라미터:
    - status: 상태로 필터링 (pending, completed)
- POST `/api/v1/todos`: 새 할 일 생성
- GET `/api/v1/todos/:id`: 특정 할 일 조회
- PATCH `/api/v1/todos/:id`: 할 일 수정
- DELETE `/api/v1/todos/:id`: 할 일 삭제

## 프로젝트 구조

```
src/
  ├── models/
  │   └── todo.js         # 할 일 모델
  ├── controllers/
  │   └── todos.js        # 할 일 컨트롤러
  ├── routes/
  │   └── todos.js        # 할 일 라우터
  ├── __tests__/
  │   └── todos.test.js   # 할 일 API 테스트
  ├── swagger.yaml        # API 명세
  └── app.js             # 메인 애플리케이션 파일
```

## API 응답 예시

### 성공 응답

```json
{
  "status": "success",
  "data": {
    "todo": {
      "id": 1,
      "title": "보고서 작성하기",
      "description": "프로젝트 진행 상황 보고서 작성",
      "status": "pending",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### 실패 응답

```json
{
  "status": "fail",
  "message": "할 일을 찾을 수 없습니다."
}
```

## 테스트 시나리오

1. 할 일 목록 조회

   - 전체 목록 조회
   - 상태별 필터링

2. 할 일 생성

   - 유효한 데이터로 생성
   - 유효하지 않은 데이터로 생성 시도

3. 할 일 조회

   - 존재하는 할 일 조회
   - 존재하지 않는 할 일 조회

4. 할 일 수정

   - 제목 수정
   - 상태 변경

5. 할 일 삭제
   - 할 일 삭제 및 확인
