# Node.js 인증 예제

이 디렉토리에는 Node.js에서 다양한 인증 방식을 구현한 예제들이 포함되어 있습니다.

## 학습 목표

- 기본 인증 (Basic Authentication) 구현
- API 키 기반 인증 구현
- JWT(JSON Web Token) 기반 인증 구현
- 실전 인증 시스템 구현 (Sequelize + JWT)

## 디렉토리 구조

- `ch11_01/`: 기본 인증 (Basic Authentication) 예제

  - `app.js`: express-basic-auth를 사용한 기본 인증 구현
  - `package.json`: 필요한 의존성 정의

- `ch11_02/`: API 키 기반 인증 예제

  - `app.js`: API 키 검증 미들웨어 구현
  - `package.json`: 필요한 의존성 정의

- `ch11_03/`: JWT 기반 인증 예제

  - `app.js`: JWT 토큰 발급 및 검증 구현
  - `package.json`: 필요한 의존성 정의

- `ch11_04/`: 실전 인증 시스템 예제
  - `server.js`: 메인 서버 파일
  - `routes/`: 라우트 정의
  - `controllers/`: 컨트롤러 로직
  - `models/`: 데이터베이스 모델
  - `middleware/`: 인증 미들웨어
  - `services/`: 비즈니스 로직
  - `utils/`: 유틸리티 함수
  - `config/`: 설정 파일
  - `dao/`: 데이터 접근 객체

## 사용 방법

각 예제 디렉토리로 이동하여 다음 명령어를 실행하세요:

```bash
npm install
npm start
```

## 필수 조건

- Node.js 설치
- npm 또는 yarn 설치
- 각 예제별 추가 의존성 설치 필요

## 참고 자료

- [express-basic-auth 문서](https://github.com/LionC/express-basic-auth)
- [JWT 공식 문서](https://jwt.io/)
- [Sequelize 문서](https://sequelize.org/)
- [Express.js 문서](https://expressjs.com/)
