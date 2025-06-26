# Express.js 프로젝트 구조 예제

이 예제는 Express.js 애플리케이션의 모범적인 프로젝트 구조를 보여줍니다.

## 프로젝트 구조

```
├── config/         # 설정 파일
├── controllers/    # 라우트 컨트롤러
├── dao/           # 데이터 접근 객체
├── middleware/    # 미들웨어
├── models/        # 데이터 모델
├── routes/        # 라우트 정의
├── services/      # 비즈니스 로직
└── utils/         # 유틸리티 함수
```

## 주요 특징

- 모듈화된 구조
- 관심사 분리 (Separation of Concerns)
- 확장 가능한 아키텍처
- Babel 설정 포함

## 사용 방법

1. 의존성 설치:

```bash
npm install
```

2. 개발 서버 실행:

```bash
npm run dev
```

3. 프로덕션 빌드:

```bash
npm run build
```

## 의존성

- express
- babel
- 기타 프로젝트 의존성은 package.json 참조

#day09

# install postgresql

# create database and user

drop database tut09;
sudo -u postgres psql
create database tut09;
create user admin with encrypted password 'admin1234';
grant all privileges on database tut09 to admin;

# npx sequelize init

npx sequelize-cli init
npx sequelize-cli seed:generate --name demo-user

npx sequelize-cli db:seed:all


# file
curl -X POST http://localhost:3000/boards/multiple \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "title=제목" \
  -F "content=내용" \
  -F "files=@/path/to/file1.jpg" \
  -F "files=@/path/to/file2.pdf"