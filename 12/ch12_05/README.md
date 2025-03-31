# React + Socket.IO 고급 채팅 애플리케이션

이 예제는 React와 Socket.IO를 사용한 고급 기능이 포함된 채팅 애플리케이션을 구현하는 방법을 보여줍니다.

## 프로젝트 구조

```
ch12_05/
├── public/         # 정적 파일
├── server/         # Socket.IO 서버
├── src/           # React 애플리케이션
│   ├── App.js     # 메인 컴포넌트
│   ├── App.css    # 스타일시트
│   └── index.js   # 진입점
└── package.json   # 프로젝트 설정
```

## 주요 기능

- React 기반의 고급 UI/UX
- Socket.IO를 사용한 실시간 통신
- 사용자 인증 및 권한 관리
- 파일 전송 기능
- 이모지 지원
- 읽음 확인 기능
- 타이핑 중 표시
- 메시지 히스토리 관리
- 실시간 알림

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
  - 메시지 목록
  - 현재 입력 메시지
- Socket.IO 이벤트 처리
  - 메시지 수신
  - 메시지 전송
- UI 컴포넌트
  - 메시지 목록 표시
  - 메시지 입력 폼
  - 전송 버튼

### Socket.IO 서버

- 실시간 통신 처리
- 파일 업로드/다운로드
- 사용자 상태 관리
- 메시지 전달 및 저장
- 읽음 확인 처리

## 의존성

- react
- socket.io-client
- express
- socket.io
- styled-components
- 기타 React 관련 패키지들
