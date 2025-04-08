# Chapter 09: MongoDB와 Express.js

이 디렉토리는 Node.js에서 MongoDB 데이터베이스와 Express.js를 함께 사용하는 방법을 다루는 예제 코드를 포함하고 있습니다. MongoDB의 기본 개념부터 Mongoose를 활용한 데이터 모델링, 그리고 Express.js와의 연동까지 단계별로 학습할 수 있습니다.

## 학습 목표

- MongoDB 기본 개념 이해
- MongoDB 쿼리 작성
- Mongoose ODM 사용법
- 스키마 정의와 모델링
- Express.js와 MongoDB 연동
- RESTful API 구현
- 데이터 검증과 에러 처리

## 디렉토리 구조

### ch09_01: MongoDB 기본 명령어

- **ch09_01.mongodb**: MongoDB 기본 명령어 예제
  - 데이터베이스 생성/삭제
  - 컬렉션 생성/삭제
  - CRUD 작업
  - 쿼리 작성
  - 인덱스 생성
  - 정렬과 필터링

### ch09_02: Mongoose 기본 예제

- **ch09_02.js**: Mongoose 기본 사용법
  - 데이터베이스 연결
  - 스키마 정의
  - 모델 생성
  - CRUD 작업
  - 데이터 검증
  - 타임스탬프

### ch09_03: Express.js와 MongoDB 연동

- **app.js**: Express 애플리케이션 설정

  - MongoDB 연결
  - 스키마 정의
  - 라우트 핸들러
  - 에러 처리

- **routes.js**: API 라우트 정의

  - RESTful 엔드포인트
  - 미들웨어 설정
  - 요청/응답 처리

- **db.js**: 데이터베이스 설정

  - 연결 설정
  - 에러 핸들링
  - 연결 상태 관리

- **board.js**: 게시판 모델

  - 스키마 정의
  - 관계 설정
  - 메서드 정의

- **server.js**: 서버 실행
  - 포트 설정
  - 서버 시작
  - 환경 설정

## 사용 방법

1. MongoDB 서버를 실행합니다:

   ```bash
   mongod
   ```

2. 필요한 패키지를 설치합니다:

   ```bash
   # ch09_02 디렉토리에서
   cd 09/ch09_02
   npm install

   # ch09_03 디렉토리에서
   cd 09/ch09_03
   npm install
   ```

3. 예제를 실행합니다:

   ```bash
   # Mongoose 기본 예제
   node ch09_02.js

   # Express.js 서버 실행
   node server.js
   ```

4. API 테스트:
   - GET /boards: 게시글 목록 조회
   - POST /boards: 게시글 작성
   - GET /boards/:id: 게시글 상세 조회
   - PUT /boards/:id: 게시글 수정
   - DELETE /boards/:id: 게시글 삭제

## 사전 준비

- Node.js v14 이상이 설치되어 있어야 합니다
- MongoDB가 설치되어 있어야 합니다
- npm이 설치되어 있어야 합니다
- Express.js 기본 지식이 필요합니다

## 주의사항

- MongoDB 서버가 실행 중이어야 합니다
- 데이터베이스 연결 정보를 확인하세요
- 스키마 정의 시 데이터 타입을 정확히 지정하세요
- 에러 처리를 적절히 구현하세요
- 보안 설정을 확인하세요

## 참고 자료

- [MongoDB 공식 문서](https://www.mongodb.com/docs/)
- [Mongoose 공식 문서](https://mongoosejs.com/docs/)
- [Express.js 공식 문서](https://expressjs.com/)
- [MongoDB Node.js 드라이버](https://www.mongodb.com/docs/drivers/node/current/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
