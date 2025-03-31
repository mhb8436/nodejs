## Node.js 학습을 위한 실습 예제 모음

`11` 폴더는 Node.js를 활용한 다양한 예제를 포함하고 있으며, 각 예제는 별도의 하위 폴더로 구성되어 있습니다. 이 폴더는 학습 목적으로 설계되었으며, RESTful API 구현, 데이터베이스 연동, 인증 및 권한 관리 등 다양한 주제를 다룹니다.

## 폴더 구조

```
11/
├── README.md
├── ch11_01/
│   ├── app.js
│   └── package.json
├── ch11_02/
│   ├── app.js
│   └── package.json
├── ch11_03/
│   ├── app.js
│   └── package.json
└── ch11_04/
    ├── .babelrc
    ├── package.json
    ├── README.md
    ├── server.js
    ├── config/
    │   └── config.json
    ├── controllers/
    │   ├── authController.js
    │   ├── boardController.js
    │   └── userController.js
    ├── dao/
    │   ├── boardDao.js
    │   ├── boardDao.test.js
    │   ├── userDao.js
    │   └── userDao.test.js
    ├── middleware/
    │   └── auth_middleware.js
    ├── models/
    │   ├── board.js
    │   ├── index.js
    │   └── user.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── boardRoutes.js
    │   └── userRoutes.js
    ├── services/
    │   └── ...
    └── utils/
```

## 주요 내용

### 1. `ch11_01`, `ch11_02`, `ch11_03`

- 간단한 Node.js 애플리케이션 예제를 포함하고 있습니다.
- 각 폴더는 `app.js`와 `package.json` 파일로 구성되어 있으며, 기본적인 서버 설정 및 간단한 기능 구현을 다룹니다.

### 2. `ch11_04`

- 보다 복잡한 애플리케이션 구조를 포함하고 있으며, 다음과 같은 주요 기능을 제공합니다:
  - **라우팅**: `routes/` 폴더에 정의된 라우터를 통해 API 엔드포인트를 관리합니다.
  - **컨트롤러**: `controllers/` 폴더에서 요청을 처리하는 로직을 구현합니다.
  - **데이터 접근 계층(DAO)**: `dao/` 폴더에서 데이터베이스와의 상호작용을 담당합니다.
  - **서비스 계층**: `services/` 폴더에서 비즈니스 로직을 처리합니다.
  - **미들웨어**: `middleware/` 폴더에서 인증 및 기타 요청 전처리를 수행합니다.
  - **모델**: `models/` 폴더에서 Sequelize를 사용하여 데이터베이스 모델을 정의합니다.
  - **유틸리티**: `utils/` 폴더에서 토큰 생성 등 공통 기능을 제공합니다.

### 3. 데이터베이스 연동

- `models/index.js` 파일에서 Sequelize를 사용하여 데이터베이스 연결을 설정합니다.
- `config/config.json` 파일에서 환경별 데이터베이스 설정을 관리합니다.

### 4. 인증 및 권한 관리

- `authController.js`에서 사용자 인증 및 토큰 발급 로직을 구현합니다.
- `auth_middleware.js`에서 JWT를 활용한 인증 미들웨어를 제공합니다.

### 5. 테스트

- `dao/` 폴더 내 테스트 파일(`*.test.js`)을 통해 데이터 접근 계층의 기능을 검증합니다.

## 실행 방법

1. 프로젝트 의존성 설치:

   ```bash
   npm install
   ```

2. 서버 실행:

   ```bash
   node server.js
   ```

3. API 테스트:
   - Postman 또는 cURL을 사용하여 API 엔드포인트를 테스트할 수 있습니다.

## 학습 목표

- Node.js와 Express를 활용한 RESTful API 설계 및 구현
- Sequelize를 사용한 데이터베이스 연동
- JWT를 활용한 인증 및 권한 관리
- 계층형 아키텍처 설계 및 구현

이 폴더는 Node.js 학습자에게 실질적인 예제와 실습 기회를 제공합니다.
