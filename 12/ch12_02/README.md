# Socket.IO 기본 채팅 예제

이 예제는 Socket.IO를 사용한 기본적인 채팅 애플리케이션을 구현하는 방법을 보여줍니다.

## 주요 기능

- Socket.IO를 사용한 실시간 채팅
- 브로드캐스팅 메시지 전송
- 사용자 연결/연결 해제 이벤트 처리
- 자동 스크롤 기능
- Simple.css를 사용한 깔끔한 UI

## 프로젝트 구조

```
ch12_02/
├── server.js     # Socket.IO 서버 구현
├── index.html    # 채팅 클라이언트 UI
└── package.json  # 프로젝트 설정
```

## 사용 방법

1. 서버 실행:

```bash
npm install
node server.js
```

2. 클라이언트 접속:

- 브라우저에서 `http://localhost:3000` 접속
- 여러 브라우저 창을 열어 채팅 테스트 가능
- 입력창에 메시지를 입력하고 전송 버튼 클릭 또는 Enter 키로 메시지 전송

## 주요 코드 설명

### 서버 측 (server.js)

- Express 서버 설정
- Socket.IO 서버 초기화
- 채팅 메시지 이벤트 처리
- 연결/연결 해제 이벤트 처리

### 클라이언트 측 (index.html)

- Socket.IO 클라이언트 연결
- 메시지 전송 폼 처리
- 메시지 수신 및 표시
- 자동 스크롤 기능

## 의존성

- express
- socket.io
