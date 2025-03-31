# Chapter 07: Node.js 게시판 애플리케이션

이 폴더는 Node.js, Express, SQLite, EJS 템플릿을 사용한 간단한 게시판 애플리케이션의 구현을 포함하고 있습니다. 주요 기능은 다음과 같습니다:

## 주요 기능

1. **데이터베이스 설정**:

   - SQLite 데이터베이스(`board.db`)는 `board` 테이블로 초기화됩니다.
   - 테이블 필드: `id`, `title`, `content`, `writer`, `write_date`, `count`.

2. **라우트**:

   - `/`: 홈 페이지 렌더링.
   - `/list`: 게시글 목록을 페이지네이션하여 표시.
   - `/detail/:id`: 특정 게시글의 상세 정보를 보여주고 조회수를 증가.
   - `/write`: 새 게시글 작성 폼 제공.
   - `/update/:id`: 기존 게시글 수정.
   - `/delete/:id`: ID로 게시글 삭제.

3. **SQL 스크립트**:

   - `ch07_sol_01.sql`은 `board` 테이블의 스키마와 샘플 데이터를 포함.

4. **뷰**:

   - EJS 템플릿을 사용하여 페이지 렌더링. 레이아웃(`header`, `footer`, `nav`)과 페이지(`home`, `list`, `detail`, `write`, `update`) 포함.

5. **스타일링**:

   - CSS 파일은 `public/css` 폴더에 위치하며, `board.css`가 애플리케이션 스타일을 제공.

6. **서버**:
   - 애플리케이션은 포트 3000에서 실행되며, Express를 라우팅 및 미들웨어로 사용.

## 실행 방법

1. 의존성 설치:

   ```
   npm install
   ```

2. 서버 시작:

   ```
   node server.js
   ```

3. 애플리케이션 접속:
   - `http://localhost:3000`에서 접속 가능.

## 참고 사항

- SQLite를 사용하여 데이터베이스 파일을 로컬에 저장.
- 서버 실행 전 `board.db` 파일이 올바른 위치(`ch07_06/`)에 있는지 확인.

이 프로젝트는 CRUD 작업, 페이지네이션, EJS 템플릿 사용을 포함한 Node.js 애플리케이션의 기본적인 기능을 보여줍니다.
