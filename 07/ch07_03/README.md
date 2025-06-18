# API 문서 작성

이 예제는 API 문서를 작성하는 방법을 보여줍니다.

## API 개요

메모 관리를 위한 RESTful API입니다.

### 기본 정보

- 기본 URL: `http://localhost:3000`
- 응답 형식: JSON
- 인증: 없음 (예제용)

## 엔드포인트

### 메모 생성

새로운 메모를 생성합니다.

- URL: `/api/memos`
- 메소드: `POST`
- 요청 바디:
  ```json
  {
    "title": "메모 제목",
    "content": "메모 내용"
  }
  ```
- 성공 응답 (201 Created):
  ```json
  {
    "id": 1,
    "title": "메모 제목",
    "content": "메모 내용",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
  ```

### 메모 목록 조회

모든 메모를 조회합니다.

- URL: `/api/memos`
- 메소드: `GET`
- 성공 응답 (200 OK):
  ```json
  [
    {
      "id": 1,
      "title": "메모 제목",
      "content": "메모 내용",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
  ```

### 특정 메모 조회

ID로 특정 메모를 조회합니다.

- URL: `/api/memos/:id`
- 메소드: `GET`
- URL 파라미터:
  - `id`: 메모 ID (숫자)
- 성공 응답 (200 OK):
  ```json
  {
    "id": 1,
    "title": "메모 제목",
    "content": "메모 내용",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
  ```
- 실패 응답 (404 Not Found):
  ```json
  {
    "error": "메모를 찾을 수 없습니다."
  }
  ```

### 메모 수정

특정 메모의 내용을 수정합니다.

- URL: `/api/memos/:id`
- 메소드: `PUT`
- URL 파라미터:
  - `id`: 메모 ID (숫자)
- 요청 바디:
  ```json
  {
    "title": "수정된 제목",
    "content": "수정된 내용"
  }
  ```
- 성공 응답 (200 OK):
  ```json
  {
    "id": 1,
    "title": "수정된 제목",
    "content": "수정된 내용",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
  ```
- 실패 응답 (404 Not Found):
  ```json
  {
    "error": "메모를 찾을 수 없습니다."
  }
  ```

### 메모 삭제

특정 메모를 삭제합니다.

- URL: `/api/memos/:id`
- 메소드: `DELETE`
- URL 파라미터:
  - `id`: 메모 ID (숫자)
- 성공 응답: 204 No Content
- 실패 응답 (404 Not Found):
  ```json
  {
    "error": "메모를 찾을 수 없습니다."
  }
  ```

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

### curl 예시

1. 메모 생성:

   ```bash
   curl -X POST http://localhost:3000/api/memos \
   -H "Content-Type: application/json" \
   -d '{"title": "테스트", "content": "테스트 내용"}'
   ```

2. 메모 목록 조회:

   ```bash
   curl http://localhost:3000/api/memos
   ```

3. 특정 메모 조회:

   ```bash
   curl http://localhost:3000/api/memos/1
   ```

4. 메모 수정:

   ```bash
   curl -X PUT http://localhost:3000/api/memos/1 \
   -H "Content-Type: application/json" \
   -d '{"title": "수정됨", "content": "수정된 내용"}'
   ```

5. 메모 삭제:
   ```bash
   curl -X DELETE http://localhost:3000/api/memos/1
   ```
