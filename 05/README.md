# 05 폴더 설명

이 폴더는 Node.js 튜토리얼의 다섯 번째 단계에 해당하며, 다양한 템플릿 엔진과 CRUD 기능을 학습할 수 있는 예제 코드가 포함되어 있습니다. 아래는 폴더와 파일별로 하는 일에 대한 설명입니다.

## 폴더 및 파일 설명

### ch05_01

- **app.js**: Pug 템플릿 엔진을 사용하여 간단한 메시지를 렌더링하는 Express 서버를 초기화합니다.
- **views/index.pug**: Pug 템플릿 파일로, `app.js`에서 렌더링되는 HTML 구조를 정의합니다.

### ch05_02

- **app.js**: Handlebars 템플릿 엔진을 설정하고 기본 라우트를 처리하는 Express 서버를 초기화합니다.
- **views/index.handlebars**: Handlebars 템플릿 파일로, `app.js`에서 렌더링되는 HTML 구조를 정의합니다.
- **views/layouts/main.handlebars**: Handlebars의 레이아웃 파일로, 공통 레이아웃을 정의합니다.

### ch05_03

- **app.js**: EJS 템플릿 엔진을 사용하여 다양한 라우트를 처리하는 Express 서버를 초기화합니다. JSON 데이터를 읽어와 템플릿에 전달합니다.
- **test.json**: JSON 형식의 샘플 데이터 파일로, EJS 템플릿에서 사용됩니다.
- **views/**: EJS 템플릿 파일들이 포함되어 있으며, 반복문(`for.ejs`), 조건문(`if.ejs`), 샘플 데이터 렌더링(`sample.ejs`, `test.ejs`) 등을 학습할 수 있습니다.

### ch05_04

- **server.js**: CRUD 기능을 구현한 Express 서버로, EJS 템플릿 엔진을 사용합니다. JSON 파일(`test.json`)을 데이터베이스처럼 사용하여 데이터를 읽고 쓰는 기능을 제공합니다.
- **test.json**: 게시판 데이터를 저장하는 JSON 파일입니다.
- **public/css/board.css**: 게시판 스타일을 정의한 CSS 파일입니다.
- **views/layouts/**: 공통 레이아웃 파일(`header.ejs`, `footer.ejs`, `nav.ejs`)이 포함되어 있습니다.
- **views/pages/**: 게시판의 각 페이지(`home.ejs`, `list.ejs`, `detail.ejs`, `write.ejs`, `update.ejs`)를 렌더링하는 템플릿 파일이 포함되어 있습니다.

## 실행 방법

1. Node.js가 설치되어 있는지 확인합니다.
2. 각 하위 폴더로 이동하여 필요한 패키지를 설치합니다:
   ```bash
   cd /Users/mhb8436/Workspaces/tutorial/nodejs/05/ch05_01
   npm install
   ```
3. 애플리케이션을 실행합니다:
   ```bash
   node app.js
   ```
   또는 `ch05_04`의 경우:
   ```bash
   npm run dev
   ```

## 주요 학습 내용

- 다양한 템플릿 엔진(Pug, Handlebars, EJS) 사용법
- Express를 활용한 CRUD 기능 구현
- JSON 파일을 데이터베이스처럼 사용하는 방법
- 템플릿 엔진을 활용한 동적 HTML 생성

## 참고 사항

- 이 폴더의 코드는 학습 목적으로 작성되었으며, 실제 프로젝트에서는 데이터베이스 사용 및 보안 강화가 필요합니다.
- 질문이나 문제가 있을 경우 튜토리얼 문서를 참조하거나 커뮤니티에 문의하세요.
- 각 하위 폴더는 독립적으로 실행되며, 서로 다른 템플릿 엔진과 기능을 학습할 수 있도록 설계되었습니다.
