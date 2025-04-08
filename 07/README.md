# Chapter 07: Express.js 웹 애플리케이션

이 디렉토리는 Express.js를 사용한 웹 애플리케이션 예제를 포함하고 있습니다. SQLite를 데이터베이스로 사용하는 간단한 게시판 애플리케이션을 통해 Express.js의 기본적인 사용법과 웹 애플리케이션 개발 방법을 학습할 수 있습니다.

## 학습 목표

- Express.js 기본 개념 이해
- 라우팅 처리
- 템플릿 엔진 사용 (EJS)
- 데이터베이스 연동 (SQLite)
- CRUD 기능 구현
- 페이지네이션 구현
- 정적 파일 처리

## 디렉토리 구조

### ch07_01: 게시판 애플리케이션

- **server.js**: Express 서버 설정 및 라우팅

  - 데이터베이스 연결
  - 라우트 핸들러
  - CRUD API 구현
  - 페이지네이션 처리

- **views/**: EJS 템플릿 파일

  - **layouts/**: 공통 레이아웃
    - header.ejs: 헤더 템플릿
    - footer.ejs: 푸터 템플릿
    - nav.ejs: 네비게이션 템플릿
  - **pages/**: 페이지별 템플릿
    - home.ejs: 홈페이지
    - list.ejs: 게시글 목록
    - detail.ejs: 게시글 상세
    - write.ejs: 게시글 작성
    - update.ejs: 게시글 수정

- **public/**: 정적 파일

  - CSS, JavaScript, 이미지 등

- **board.db**: SQLite 데이터베이스 파일

## 사용 방법

1. 이 디렉토리로 이동합니다:

   ```bash
   cd 07/ch07_01
   ```

2. 필요한 패키지를 설치합니다:

   ```bash
   npm install
   ```

3. 서버를 실행합니다:

   ```bash
   node server.js
   ```

4. 웹 브라우저에서 다음 주소로 접속합니다:
   - http://localhost:3000

## 주요 기능

- 게시글 목록 조회 (페이지네이션)
- 게시글 상세 보기
- 게시글 작성
- 게시글 수정
- 게시글 삭제
- 조회수 카운트

## 사전 준비

- Node.js v14 이상이 설치되어 있어야 합니다
- npm이 설치되어 있어야 합니다
- SQLite가 설치되어 있어야 합니다

## 주의사항

- 데이터베이스 파일(board.db)이 올바른 위치에 있어야 합니다
- 포트 3000이 사용 가능해야 합니다
- SQL 인젝션 방지를 위한 입력값 검증이 필요합니다
- 에러 처리가 필요합니다

## 참고 자료

- [Express.js 공식 문서](https://expressjs.com/)
- [EJS 템플릿 엔진](https://ejs.co/)
- [SQLite3 Node.js 드라이버](https://github.com/mapbox/node-sqlite3)
- [Node.js SQLite3 문서](https://www.sqlitetutorial.net/sqlite-nodejs/)
