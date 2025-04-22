# NestJS 튜토리얼

이 튜토리얼은 Express.js 개발자를 위한 NestJS 학습 가이드입니다.

## 목차

1. 기본 개념

   - 모듈 (Modules)
   - 컨트롤러 (Controllers)
   - 서비스 (Services)
   - 의존성 주입 (Dependency Injection)

2. 데이터베이스 연동

   - TypeORM 설정
   - 엔티티 정의
   - CRUD 작업

3. 미들웨어와 가드

   - 커스텀 미들웨어
   - 가드 (Guards)
   - 인터셉터 (Interceptors)

4. 인증과 권한

   - JWT 인증
   - 역할 기반 접근 제어

5. API 문서화
   - Swagger 설정
   - API 엔드포인트 문서화

## 시작하기

```bash
# 프로젝트 설치
npm install -g @nestjs/cli
nest new post
npm install pg
npm install --save @nestjs/swagger swagger-ui-express
# npm install --save @nestjs/swagger
npm i --save class-validator class-transformer
npm install --save typeorm @nestjs/typeorm
npm i bcrypt @types/bcrypt @nestjs/passport passport-jwt

psql postgres

CREATE DATABASE mypost1;
CREATE USER myuser WITH PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE mypost1 TO myuser;


# 개발 서버 실행
npm run start:dev
```

## 프로젝트 구조

```
src/
├── app.module.ts          # 루트 모듈
├── main.ts               # 애플리케이션 엔트리 포인트
├── users/                # 사용자 모듈
│   ├── users.module.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── dto/
│       ├── create-user.dto.ts
│       └── update-user.dto.ts
└── auth/                 # 인증 모듈
    ├── auth.module.ts
    ├── auth.controller.ts
    ├── auth.service.ts
    └── guards/
        └── jwt-auth.guard.ts
```
