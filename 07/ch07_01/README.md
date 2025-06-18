# HTTP 상태 코드와 에러 처리 - 게시판 API

이 예제는 게시판 API를 통해 HTTP 상태 코드와 에러 처리 방법을 보여줍니다.

## API 엔드포인트

### 게시글 목록 조회 (GET /api/posts)

- 성공: 200 OK
- 페이지네이션 지원 (query: page, limit)
- 응답 예시:
  ```json
  {
    "posts": [
      {
        "id": 1,
        "title": "첫 번째 게시글",
        "content": "안녕하세요!",
        "author": "홍길동",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "views": 0
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalPosts": 1
    }
  }
  ```

### 게시글 상세 조회 (GET /api/posts/:id)

- 성공: 200 OK
- 실패: 404 Not Found
- 응답 예시 (성공):
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "title": "첫 번째 게시글",
      "content": "안녕하세요!",
      "author": "홍길동",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "views": 1
    }
  }
  ```

### 게시글 작성 (POST /api/posts)

- 성공: 201 Created
- 실패: 400 Bad Request
- 요청 바디:
  ```json
  {
    "title": "새 게시글",
    "content": "내용입니다.",
    "author": "작성자"
  }
  ```

### 게시글 수정 (PUT /api/posts/:id)

- 성공: 200 OK
- 실패: 404 Not Found, 400 Bad Request
- 요청 바디:
  ```json
  {
    "title": "수정된 제목",
    "content": "수정된 내용"
  }
  ```

### 게시글 삭제 (DELETE /api/posts/:id)

- 성공: 204 No Content
- 실패: 404 Not Found

## HTTP 상태 코드

- 200: 성공적인 요청
- 201: 리소스 생성 성공
- 204: 성공적인 삭제 (응답 바디 없음)
- 400: 잘못된 요청 (입력값 누락 등)
- 404: 리소스를 찾을 수 없음
- 500: 서버 에러

## 에러 처리

1. try-catch를 사용한 에러 처리
2. 입력값 검증
3. 존재하지 않는 리소스 처리
4. 전역 에러 처리 미들웨어

## 실행 방법

1. 패키지 설치:

   ```bash
   npm install
   ```

2. 서버 실행:
   ```bash
   npm run dev
   ```

## API 테스트

1. 게시글 목록 조회:

   ```bash
   curl http://localhost:3000/api/posts
   ```

2. 특정 게시글 조회:

   ```bash
   curl http://localhost:3000/api/posts/1
   ```

3. 새 게시글 작성:

   ```bash
   curl -X POST http://localhost:3000/api/posts \
   -H "Content-Type: application/json" \
   -d '{"title": "새 글", "content": "내용", "author": "작성자"}'
   ```

4. 게시글 수정:

   ```bash
   curl -X PUT http://localhost:3000/api/posts/1 \
   -H "Content-Type: application/json" \
   -d '{"title": "수정된 제목", "content": "수정된 내용"}'
   ```

5. 게시글 삭제:
   ```bash
   curl -X DELETE http://localhost:3000/api/posts/1
   ```
