# Chapter 08: Sequelize ORM

이 디렉토리는 Node.js에서 Sequelize ORM을 사용하는 방법을 다루는 예제 코드를 포함하고 있습니다. Sequelize를 통해 SQLite 데이터베이스를 객체지향적으로 다루는 방법을 학습할 수 있습니다.

## 학습 목표

- Sequelize 기본 개념 이해
- 모델 정의와 관계 설정
- CRUD 작업 수행
- 쿼리 작성과 실행
- 파일 업로드 처리
- 데이터베이스 마이그레이션
- 트랜잭션 처리

## 디렉토리 구조

### ch08_01: Sequelize 기본 예제

- **ch08_01.js**: 기본 CRUD 작업

  - Sequelize 초기화
  - 모델 정의
  - 데이터 생성
  - 데이터 조회
  - 데이터 수정
  - 데이터 삭제
  - 관계 설정 예제 (주석 처리됨)

- **sample.sqlite**: SQLite 데이터베이스 파일

### ch08_02: 게시판 API 예제

- **server.js**: Express 서버 설정

  - RESTful API 구현
  - 파일 업로드 처리
  - Sequelize 모델 사용
  - 데이터베이스 연결

- **models/**: Sequelize 모델 정의

  - Board 모델
  - 관계 설정

- **config/**: 데이터베이스 설정

  - Sequelize 설정
  - 환경별 설정

- **public/**: 정적 파일

  - 업로드된 파일 저장

- **board.sqlite3**: SQLite 데이터베이스 파일

### ext-02: 고급 기능 예제

- **common/**: 공통 기능

  - 유틸리티 함수
  - 미들웨어

- **es6/**: ES6+ 기능 활용
  - 클래스 기반 모델
  - 비동기 처리
  - 모듈 시스템

## 사용 방법

1. 필요한 패키지를 설치합니다:

   ```bash
   # ch08_01 디렉토리에서
   cd 08/ch08_01
   npm install

   # ch08_02 디렉토리에서
   cd 08/ch08_02
   npm install
   ```

2. 예제를 실행합니다:

   ```bash
   # 기본 예제 실행
   node ch08_01.js

   # 게시판 API 서버 실행
   node server.js
   ```

3. API 테스트:
   - GET /boards: 게시글 목록 조회
   - POST /boards: 게시글 작성
   - GET /boards/:id: 게시글 상세 조회
   - PUT /boards/:id: 게시글 수정
   - DELETE /boards/:id: 게시글 삭제

## 사전 준비

- Node.js v14 이상이 설치되어 있어야 합니다
- npm이 설치되어 있어야 합니다
- SQLite가 설치되어 있어야 합니다
- Express.js 기본 지식이 필요합니다

## 주의사항

- 데이터베이스 파일이 올바른 위치에 있어야 합니다
- 모델 정의 시 데이터 타입을 정확히 지정해야 합니다
- 관계 설정 시 양방향 관계를 고려해야 합니다
- 트랜잭션 처리가 필요한 작업에 주의해야 합니다
- 파일 업로드 시 저장 경로와 권한을 확인해야 합니다

## 참고 자료

- [Sequelize 공식 문서](https://sequelize.org/)
- [Sequelize 모델 정의](https://sequelize.org/docs/v6/core-concepts/model-basics/)
- [Sequelize 관계 설정](https://sequelize.org/docs/v6/core-concepts/assocs/)
- [Sequelize 쿼리 인터페이스](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/)
- [SQLite Node.js 드라이버](https://github.com/mapbox/node-sqlite3)
