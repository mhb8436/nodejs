# Node.js 튜토리얼 - 10장

이 폴더는 Node.js 튜토리얼 10장의 예제와 연습문제를 포함하고 있습니다. 아래는 폴더 구조와 내용에 대한 개요입니다:

## 폴더 구조

```
/Users/mhb8436/Workspaces/tutorial/nodejs/10
├── ch10_01.sql
├── README.md
├── ch10_02/
│   ├── app.js
│   ├── app.test.js
│   ├── math.js
│   ├── math.test.js
│   └── package.json
└── ch10_03/
    ├── .babelrc
    ├── package.json
    ├── README.md
    ├── server.js
    ├── config/
    │   └── config.json
    ├── controllers/
    │   ├── boardController.js
    │   └── userController.js
    ├── dao/
    │   ├── boardDao.js
    │   ├── boardDao.test.js
    │   ├── userDao.js
    │   └── userDao.test.js
    ├── models/
    │   ├── board.js
    │   ├── index.js
    │   └── user.js
    ├── routes/
    │   ├── boardRoutes.js
    │   └── userRoutes.js
    └── services/
        ├── boardService.js
        └── userService.js
```

## 내용

### ch10_01.sql

이 파일은 10장 예제와 관련된 데이터베이스 설정 또는 쿼리를 위한 SQL 스크립트를 포함하고 있습니다.

### ch10_02/

이 폴더는 Node.js 애플리케이션의 기본 예제를 포함하고 있습니다:

- `app.js`: 간단한 애플리케이션.
- `math.js`: 수학 연산 모듈.
- 테스트 파일 (`app.test.js`, `math.test.js`): 애플리케이션과 수학 모듈의 단위 테스트를 포함.

### ch10_03/

이 폴더는 **MVC (모델-뷰-컨트롤러)** 아키텍처를 사용하는 고급 Node.js 애플리케이션을 보여줍니다. 주요 구성 요소는 다음과 같습니다:

- **`server.js`**: 애플리케이션의 진입점으로, Express 서버를 설정하고 데이터베이스에 연결합니다.
- **`config/`**: 데이터베이스 설정을 위한 `config.json`과 같은 구성 파일을 포함합니다.
- **`controllers/`**: HTTP 요청 및 응답 처리를 위한 로직을 구현합니다.
  - `boardController.js`: 게시판 관련 작업을 관리.
  - `userController.js`: 사용자 관련 작업을 관리.
- **`dao/`**: 데이터베이스와 상호작용하기 위한 데이터 접근 객체.
  - `boardDao.js`, `userDao.js`: 게시판 및 사용자에 대한 CRUD 작업 메서드를 정의.
  - 테스트 파일 (`boardDao.test.js`, `userDao.test.js`): DAO 계층의 단위 테스트를 포함.
- **`models/`**: 데이터베이스 테이블에 대한 Sequelize 모델을 정의 (`board.js`, `user.js` 등).
- **`routes/`**: 게시판 및 사용자에 대한 API 경로를 정의.
- **`services/`**: 게시판 및 사용자에 대한 비즈니스 로직을 구현.

## 애플리케이션 실행 방법

1. `ch10_03` 폴더로 이동:

   ```bash
   cd /Users/mhb8436/Workspaces/tutorial/nodejs/10/ch10_03
   ```

2. 의존성 설치:

   ```bash
   npm install
   ```

3. 서버 시작:

   ```bash
   node server.js
   ```

4. 서버는 `http://localhost:3000`에서 시작됩니다. Postman 또는 curl과 같은 도구를 사용하여 API와 상호작용할 수 있습니다.

## 주요 기능

- **데이터베이스 통합**: Sequelize ORM을 사용한 데이터베이스 작업.
- **RESTful API**: 게시판 및 사용자에 대한 CRUD 작업 구현.
- **단위 테스트**: DAO 메서드에 대한 테스트 케이스 포함.

## 참고 사항

- 애플리케이션 실행 전에 `config/config.json`에서 데이터베이스가 올바르게 설정되었는지 확인하세요.
- 제공된 테스트 파일을 사용하여 DAO 계층의 기능을 검증하세요.

이 장에서는 모듈성과 확장성에 중점을 둔 풀스택 Node.js 애플리케이션 구축의 포괄적인 예제를 제공합니다.
