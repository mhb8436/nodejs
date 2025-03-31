# NestJS MSA 예제

이 프로젝트는 NestJS를 사용한 마이크로서비스 아키텍처 예제입니다.

## 프로젝트 구조

```
project/
├── api-gateway/          # API 게이트웨이 (포트: 3000)
├── auth-service/         # 인증 서비스 (포트: 3001)
├── user-service/         # 사용자 서비스 (포트: 3002)
└── post-service/         # 게시글 서비스 (포트: 3003)
```

## 서비스 설명

1. **API Gateway**

   - 모든 외부 요청의 진입점
   - 라우팅 및 인증 처리
   - 서비스 간 통신 조정

2. **Auth Service**

   - 사용자 인증 처리
   - JWT 토큰 발급
   - 권한 관리

3. **User Service**

   - 사용자 정보 관리
   - 프로필 CRUD
   - 사용자 설정 관리

4. **Post Service**
   - 게시글 CRUD
   - 게시글 검색
   - 게시글 통계

## 실행 방법

1. 각 서비스 디렉토리에서 의존성 설치:

```bash
cd api-gateway && npm install
cd ../auth-service && npm install
cd ../user-service && npm install
cd ../post-service && npm install
```

2. 각 서비스 실행:

```bash
# API Gateway
cd api-gateway && npm run start:dev

# Auth Service
cd auth-service && npm run start:dev

# User Service
cd user-service && npm run start:dev

# Post Service
cd post-service && npm run start:dev
```

## API 엔드포인트

### API Gateway (http://localhost:3000)

- POST /auth/login - 로그인
- POST /auth/register - 회원가입
- GET /users - 사용자 목록 조회
- GET /users/:id - 사용자 상세 조회
- GET /posts - 게시글 목록 조회
- POST /posts - 게시글 작성
- GET /posts/:id - 게시글 상세 조회

## 서비스 간 통신

- HTTP 통신
- TCP 통신
- 메시지 큐 (RabbitMQ)

## 데이터베이스

각 서비스는 독립적인 데이터베이스를 사용합니다:

- Auth Service: PostgreSQL
- User Service: PostgreSQL
- Post Service: PostgreSQL
