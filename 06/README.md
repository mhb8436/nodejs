# Chapter 06: RESTful API와 파일 시스템

이 디렉토리는 Node.js에서 RESTful API 구현과 파일 시스템 작업을 다루는 예제 코드를 포함하고 있습니다.

## 학습 목표

- RESTful API 설계
- HTTP 메서드 활용
- 파일 시스템 작업
- JSON 데이터 처리
- API 엔드포인트 구현
- 파일 업로드/다운로드
- 데이터베이스 연동
- 에러 처리

## 디렉토리 구조

- **ch06_01.curl**: API 테스트를 위한 curl 명령어
- **ch06_02/**: RESTful API 구현
  - api.js: 기본 API 구현
  - api2.js: 고급 API 기능
  - file.js: 파일 시스템 작업
  - test.json: 테스트 데이터
- **ch06_03/**: 데이터베이스 연동 API
  - app.js: Express 서버
  - db.js: 데이터베이스 연동
  - posts.db: SQLite 데이터베이스

## 사용 방법

1. 이 디렉토리로 이동합니다:

   ```bash
   cd 06
   ```

2. 필요한 의존성을 설치합니다:

   ```bash
   npm install
   ```

3. 예제를 실행합니다:

   ```bash
   # ch06_02 디렉토리로 이동하여 API 서버 실행
   cd ch06_02
   node api.js

   # ch06_03 디렉토리로 이동하여 DB 연동 API 실행
   cd ../ch06_03
   node app.js
   ```

4. API 테스트:
   ```bash
   # ch06_01.curl 파일의 명령어로 API 테스트
   curl -X GET http://localhost:3000/api/posts
   ```

## 사전 준비

- Node.js가 설치되어 있어야 합니다
- npm이 설치되어 있어야 합니다
- Chapter 01-05의 내용을 이해하고 있어야 합니다

## 참고 사항

- RESTful API는 HTTP 표준을 따릅니다
- 파일 시스템 작업은 비동기로 처리합니다
- 데이터베이스 연동은 트랜잭션을 고려합니다
- API 응답은 적절한 상태 코드를 포함합니다
