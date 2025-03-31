# Node.js Tutorial Project

이 프로젝트는 Node.js를 체계적으로 학습하기 위한 튜토리얼 프로젝트입니다. 각 디렉토리는 특정 주제나 개념을 다루는 예제 코드를 포함하고 있습니다.

## 학습 내용

### Chapter 01: Node.js 기초

- Node.js 환경 설정 및 기본 실행
- 이벤트 루프와 비동기 프로그래밍
- 모듈 시스템과 내장 모듈
- 파일 시스템 작업
- HTTP 서버 생성
- Express 프레임워크 기초

### Chapter 02: 웹 서버 개발

- RESTful API 설계
- 미들웨어 활용
- 라우팅 처리
- 정적 파일 제공
- 요청/응답 처리

### Chapter 03: 데이터베이스 연동

- 데이터베이스 연결
- CRUD 작업
- ORM 사용
- 데이터 모델링

### Chapter 04: 인증과 보안

- 사용자 인증
- JWT 토큰
- 보안 모범 사례
- 환경 변수 관리

### Chapter 05: 실시간 통신

- WebSocket 구현
- 실시간 데이터 전송
- 채팅 애플리케이션

### Chapter 06: 파일 처리

- 파일 업로드/다운로드
- 스트림 처리
- 멀티파트 데이터 처리

### Chapter 07: 테스트와 배포

- 단위 테스트
- 통합 테스트
- CI/CD 파이프라인
- 배포 전략

### Chapter 08: 성능 최적화

- 성능 모니터링
- 캐싱 전략
- 클러스터링
- 부하 분산

### Chapter 09: 프로젝트 구조화

- 모듈화
- 디자인 패턴
- 코드 구조화
- 유지보수성

### Chapter 10: 고급 주제

- 마이크로서비스 아키텍처
- 컨테이너화
- 로깅과 모니터링
- 에러 처리

### Chapter 11: 실전 프로젝트

- 실제 애플리케이션 개발
- 프로젝트 구조화
- 배포 및 운영

### Chapter 12: WebSocket과 실시간 통신

- WebSocket 기본 구현
  - 실시간 양방향 통신
  - 기본 메시지 송수신
- Socket.IO 활용
  - 기본 채팅 애플리케이션
  - 다중 채팅방 구현
- React와 Socket.IO 통합
  - 컴포넌트 기반 채팅
  - 고급 채팅 기능 (파일 전송, 이모지, 읽음 확인)

## 시작하기

### 사전 요구사항

- Node.js (v14 이상)
- npm (Node Package Manager)

### 설치 방법

1. 저장소를 클론합니다:

```bash
git clone [repository-url]
```

2. 프로젝트 디렉토리로 이동합니다:

```bash
cd nodejs
```

3. 의존성 패키지를 설치합니다:

```bash
npm install
```

## 사용 방법

각 챕터의 예제를 실행하려면 해당 디렉토리로 이동한 후 Node.js로 실행하세요:

```bash
cd 01
node ch01_01.js
```

## 프로젝트 구조

```
nodejs/
├── 01/ - Node.js 기초
├── 02/ - 웹 서버 개발
├── 03/ - 데이터베이스 연동
├── 04/ - 인증과 보안
├── 05/ - 실시간 통신
├── 06/ - 파일 처리
├── 07/ - 테스트와 배포
├── 08/ - 성능 최적화
├── 09/ - 프로젝트 구조화
├── 10/ - 고급 주제
├── 11/ - 실전 프로젝트
└── 12/ - 추가 학습
```

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
