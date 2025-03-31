# React + Socket.IO 채팅 애플리케이션

이 예제는 React와 Socket.IO를 결합한 현대적인 채팅 애플리케이션을 구현하는 방법을 보여줍니다.

## 프로젝트 구조

```
ch12_04/
├── public/         # 정적 파일
├── server/         # Socket.IO 서버
├── src/           # React 애플리케이션
│   ├── App.js     # 메인 컴포넌트
│   ├── App.css    # 스타일시트
│   └── index.js   # 진입점
└── package.json   # 프로젝트 설정
```

## 주요 기능

- React 기반의 모던 UI
- Socket.IO를 사용한 실시간 통신
- 컴포넌트 기반 구조
- 상태 관리 (useState, useEffect)
- 사용자 인증
- 채팅방 관리
- 실시간 메시지 전송
- 사용자 목록 관리

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

## 주요 코드 설명

### React 컴포넌트 (App.js)

- 상태 관리
  - 사용자 정보
  - 채팅방 정보
  - 메시지 목록
- Socket.IO 이벤트 처리
  - 로그인/로그아웃
  - 채팅방 생성/참가
  - 메시지 송수신
- UI 컴포넌트
  - 로그인 폼
  - 채팅방 목록
  - 사용자 목록
  - 채팅창

### Socket.IO 서버

- 실시간 통신 처리
- 사용자 관리
- 채팅방 관리
- 메시지 라우팅

## 의존성

- react
- socket.io-client
- express
- socket.io
- 기타 React 관련 패키지들
