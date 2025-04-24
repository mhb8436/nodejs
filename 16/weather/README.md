# Weather API

날씨 정보를 조회하고 통계를 제공하는 REST API 서비스입니다.

## 기술 스택

- Node.js
- NestJS
- PostgreSQL
- Prisma ORM
- OpenWeatherMap API

## 프로젝트 설정 방법

```sql
psql postgres

CREATE DATABASE weather;
CREATE USER myuser WITH PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE weather TO myuser;

```

1. NestJS 프로젝트 생성

```bash
# NestJS CLI 전역 설치
npm install -g @nestjs/cli

# 새 프로젝트 생성
nest new weather
cd weather
```

2. 필요한 패키지 설치

```bash
# 기본 의존성
npm install axios @nestjs/config @nestjs/axios @nestjs/schedule @nestjs/cache-manager

# Prisma 관련
npm install prisma @prisma/client

# OpenWeatherMap API 클라이언트
npm install openweathermap-api
```

3. Prisma 초기화 및 설정

```bash
# Prisma 초기화
npx prisma init

# Prisma 클라이언트 생성
npx prisma generate
```

4. 환경 변수 설정
   `.env` 파일을 생성하고 다음 내용을 추가합니다:

```
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/weather?schema=public"
OPENWEATHERMAP_API_KEY="your-api-key"
```

5. 모듈 및 리소스 생성

```bash
# Prisma 모듈 생성
nest g module prisma

# Weather 모듈 및 리소스 생성
nest g resource weather
```

6. 데이터베이스 마이그레이션

```bash
# 스키마 변경사항 적용
npx prisma db push
```

7. 서버 실행

```bash
# 개발 모드로 실행
npm run start:dev
```

## API 사용 방법

### 1. 특정 도시의 현재 날씨 조회

```bash
curl -X GET "http://localhost:3000/weather/seoul"
```

### 2. 특정 도시의 일일 날씨 통계 조회

```bash
# date 파라미터는 YYYY-MM-DD 형식으로 지정
curl -X GET "http://localhost:3000/weather/stats/daily/seoul?date=2024-04-23"
```

### 3. 특정 도시의 주간 날씨 통계 조회

```bash
# startDate 파라미터는 YYYY-MM-DD 형식으로 지정
curl -X GET "http://localhost:3000/weather/stats/weekly/seoul?startDate=2024-04-17"
```

## API 응답 예시

### 현재 날씨 조회 응답

```json
{
  "city": "seoul",
  "temperature": 20.5,
  "humidity": 65,
  "pressure": 1013,
  "windSpeed": 3.5,
  "description": "맑음",
  "timestamp": "2024-04-23T10:00:00Z"
}
```

### 일일 통계 응답

```json
{
  "city": "seoul",
  "date": "2024-04-23",
  "averageTemperature": 21.2,
  "maxTemperature": 25.0,
  "minTemperature": 18.5,
  "averageHumidity": 68
}
```

### 주간 통계 응답

```json
{
  "city": "seoul",
  "weekStart": "2024-04-17",
  "weekEnd": "2024-04-23",
  "averageTemperature": 20.8,
  "maxTemperature": 26.0,
  "minTemperature": 17.5,
  "averageHumidity": 70
}
```

## 주의사항

1. OpenWeatherMap API 키가 필요합니다. [OpenWeatherMap](https://openweathermap.org/api)에서 발급받을 수 있습니다.
2. PostgreSQL 데이터베이스가 필요하며, 적절한 권한이 설정되어 있어야 합니다.
3. 기본 포트는 3000번입니다. 필요한 경우 `main.ts`에서 포트를 변경할 수 있습니다.
4. 날짜 파라미터는 YYYY-MM-DD 형식으로 지정해야 합니다.
