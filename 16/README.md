# NestJS Weather Application

이 프로젝트는 NestJS를 사용하여 구현된 날씨 정보 조회 애플리케이션입니다. OpenWeather API를 활용하여 여러 도시의 날씨 정보를 실시간으로 조회하고 캐싱하는 기능을 제공합니다.

## 주요 기능

- 실시간 날씨 정보 조회 (서울, 부산, 인천)
- 30초마다 자동으로 날씨 데이터 업데이트
- 캐시를 통한 API 호출 최적화
- RESTful API 엔드포인트 제공

## 기술 스택

- NestJS
- TypeScript
- OpenWeather API
- Cache Manager
- Axios

## API 엔드포인트

### 1. 전체 날씨 정보 조회

- **URL**: `/weather/all`
- **Method**: GET
- **Description**: 모든 등록된 도시의 날씨 정보를 조회합니다.

### 2. 특정 도시 날씨 정보 조회

- **URL**: `/weather/:city`
- **Method**: GET
- **Parameters**:
  - city: 도시 이름 (예: Seoul, Busan, Incheon)
- **Description**: 특정 도시의 날씨 정보를 조회합니다.

## 응답 형식

```typescript
interface WeatherResponse {
  city: string;
  temperature: number;
  humidity: number;
  description: string;
  timestamp: string;
}
```

## 환경 설정

프로젝트 실행을 위해 다음 환경 변수가 필요합니다:

- `OPENWEATHER_API_KEY`: OpenWeather API 키

## 설치 및 실행

1. 의존성 설치:

```bash
npm install
```

2. 환경 변수 설정:
   `.env` 파일에 OpenWeather API 키를 설정합니다.

3. 개발 서버 실행:

```bash
npm run start:dev
```

## 캐싱 전략

- 날씨 데이터는 1분(60초) 동안 캐시됩니다.
- 30초마다 자동으로 데이터가 업데이트됩니다.
- 캐시를 통해 API 호출을 최소화하여 성능을 최적화합니다.
