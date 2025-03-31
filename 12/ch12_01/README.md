# WebSocket 기본 예제

이 예제는 Node.js에서 WebSocket을 사용한 기본적인 실시간 양방향 통신을 구현하는 방법을 보여줍니다.

## 주요 기능

- WebSocket 서버 구현
- 클라이언트-서버 간 실시간 양방향 통신
- 메시지 송수신 기능
- 연결 상태 관리 (연결, 메시지 수신, 연결 종료)

## 프로젝트 구조

```
ch12_01/
├── server.js     # WebSocket 서버 구현
├── index.html    # 클라이언트 웹 페이지
└── package.json  # 프로젝트 설정
```

## 사용 방법

1. 서버 실행:

```bash
npm install
node server.js
```

2. 클라이언트 접속:

- 브라우저에서 `index.html` 파일을 열어 WebSocket 클라이언트에 접속
- WebSocket 서버는 `ws://localhost:8080`에서 실행됨
- 입력창에 메시지를 입력하고 "Send" 버튼을 클릭하여 메시지 전송

## 주요 코드 설명

### 서버 측 (server.js)

- WebSocket 서버 생성 및 포트 설정
- 클라이언트 연결 이벤트 처리
- 메시지 수신 및 응답 전송
- 연결 종료 이벤트 처리

### 클라이언트 측 (index.html)

- WebSocket 연결 설정
- 메시지 전송 기능
- 서버로부터의 메시지 수신 및 표시
- 연결 상태 이벤트 처리

## 의존성

- ws (WebSocket)
