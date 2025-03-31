# Node.js 튜토리얼: Sequelize와 Express를 활용한 CRUD 예제

## 프로젝트 구조

```
08/
├── README.md
├── ch08_01/
│   ├── ch08_01.js
│   ├── package.json
│   └── sample.sqlite
├── ch08_02/
│   ├── board.sqlite3
│   ├── package.json
│   ├── server.js
│   ├── config/
│   │   ├── config.json
│   │   └── config.postgres.json
│   ├── models/
│   │   ├── board.js
│   │   └── index.js
│   └── public/
│       └── uploads/
│           └── bg-1720948634012.jpg
└── ext-02/
    ├── common/
    │   ├── export.js
    │   └── import.js
    ├── es6/
    │   ├── export.js
    │   ├── import.js
    │   └── package.json
```

### 디렉토리 및 파일 설명

- **ch08_01/**: 간단한 Node.js 예제 코드가 포함된 디렉토리.

  - `ch08_01.js`: 예제 코드 파일.
  - `package.json`: 프로젝트 의존성 관리 파일.
  - `sample.sqlite`: SQLite 데이터베이스 파일.

- **ch08_02/**: Sequelize와 Express를 활용한 CRUD 예제 코드가 포함된 디렉토리.

  - `board.sqlite3`: SQLite 데이터베이스 파일.
  - `package.json`: 프로젝트 의존성 관리 파일.
  - `server.js`: Express 서버 코드. Sequelize를 사용하여 데이터베이스와 상호작용.
  - `config/`: 데이터베이스 설정 파일 디렉토리.
    - `config.json`: 기본 데이터베이스 설정 파일.
    - `config.postgres.json`: PostgreSQL용 설정 파일.
  - `models/`: Sequelize 모델 정의 디렉토리.
    - `board.js`: `Board` 모델 정의 파일.
    - `index.js`: Sequelize 초기화 및 모델 로딩 파일.
  - `public/uploads/`: 업로드된 파일 저장 디렉토리.
    - `bg-1720948634012.jpg`: 업로드된 이미지 파일 예제.

- **ext-02/**: ES6 모듈과 CommonJS 모듈 예제 코드가 포함된 디렉토리.
  - `common/`: CommonJS 모듈 예제 디렉토리.
    - `export.js`: CommonJS 방식의 모듈 내보내기 예제.
    - `import.js`: CommonJS 방식의 모듈 가져오기 예제.
  - `es6/`: ES6 모듈 예제 디렉토리.
    - `export.js`: ES6 방식의 모듈 내보내기 예제.
    - `import.js`: ES6 방식의 모듈 가져오기 예제.
    - `package.json`: ES6 모듈 관련 설정 파일.

## 주요 코드 설명

### Sequelize 모델 초기화 (`models/index.js`)

`models/index.js` 파일은 Sequelize를 초기화하고 모델을 로드하는 역할을 합니다. 데이터베이스 설정은 `config/config.json` 파일에서 가져옵니다.

### Express 서버 (`server.js`)

`server.js` 파일은 Express를 사용하여 RESTful API를 구현합니다. 주요 엔드포인트:

- `GET /boards`: 모든 게시글 조회.
- `POST /boards`: 게시글 생성.
- `PUT /boards/:id`: 게시글 수정.
- `DELETE /boards/:id`: 게시글 삭제.

### 파일 업로드

`multer`를 사용하여 파일 업로드를 처리하며, 업로드된 파일은 `public/uploads/` 디렉토리에 저장됩니다.

- 업로드된 파일은 고유한 이름으로 저장되며, 경로는 `/downloads/`로 제공됩니다.

### 데이터베이스 동기화

서버 시작 시 `models.sequelize.sync()`를 호출하여 데이터베이스와 모델을 동기화합니다. `force: false` 옵션으로 기존 데이터를 유지합니다.
