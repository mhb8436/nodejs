
# NestJS GraphQL & WebSocket 채팅 예제

이 프로젝트는 NestJS를 사용하여 GraphQL과 WebSocket을 구현한 실시간 채팅 애플리케이션입니다.

## 주요 기능

- GraphQL API를 통한 메시지 및 채팅방 관리
- WebSocket을 통한 실시간 메시지 전송
- JWT 기반 사용자 인증
- 채팅방 기능 (입장/퇴장)
- 메시지 읽음 상태 표시
- 타이핑 상태 표시

## 설치 방법

1. 의존성 패키지 설치:
```bash
cd 15
npm install @nestjs/common @nestjs/core @nestjs/graphql @nestjs/platform-express @nestjs/platform-ws @nestjs/typeorm @nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt typeorm pg apollo-server-express graphql socket.io
npm install -D @types/passport-jwt @types/bcrypt @types/socket.io
```

2. PostgreSQL 설치 및 실행:

macOS:
```bash
brew install postgresql
brew services start postgresql
```

3. 데이터베이스 생성:
```bash
psql postgres
CREATE DATABASE chat_db;
\q
```

4. 환경 변수 설정:
`.env` 파일을 생성하고 다음 내용을 추가합니다:
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/chat_db
JWT_SECRET=your-super-secret-key-change-this-in-production
```

## 실행 방법

1. 애플리케이션 실행:
```bash
npm run start:dev
```

2. GraphQL 플레이그라운드 접속:
브라우저에서 `http://localhost:3000/graphql` 접속

3. 테스트 순서:

a. 사용자 등록:
```graphql
mutation {
  register(
    email: "test@example.com"
    password: "password123"
    name: "테스트유저"
  )
}
```

b. 로그인하여 JWT 토큰 받기:
```graphql
mutation {
  login(
    email: "test@example.com"
    password: "password123"
  )
}
```

c. 채팅방 생성:
```graphql
mutation {
  createChatRoom(
    name: "테스트 채팅방"
    description: "테스트용 채팅방입니다"
  ) {
    id
    name
    description
  }
}
```

4. WebSocket 테스트:
- 브라우저에서 `http://localhost:3000` 접속
- 받은 JWT 토큰을 입력하고 "연결" 버튼 클릭
- 채팅방 ID를 입력하고 "채팅방 입장" 버튼 클릭
- 메시지 입력 후 전송

## 테스트 방법

1. 여러 브라우저 창을 열어서 각각 다른 사용자로 로그인
2. 같은 채팅방에 입장하여 실시간 메시지 전송 테스트
3. 타이핑 상태, 읽음 상태 등 실시간 기능 테스트

## 주의사항

1. PostgreSQL이 실행 중이어야 합니다.
2. `.env` 파일의 데이터베이스 접속 정보가 올바르게 설정되어 있어야 합니다.
3. JWT 토큰은 로그인 후 받은 토큰을 사용해야 합니다.
4. 채팅방 ID는 채팅방 생성 후 받은 ID를 사용해야 합니다.

## 문제 해결

문제가 발생하면 다음을 확인해주세요:
1. 데이터베이스 연결 상태
2. 서버 로그의 에러 메시지
3. 브라우저 콘솔의 에러 메시지
4. JWT 토큰이 올바른지
5. 채팅방 ID가 올바른지

## API 문서

### GraphQL API

#### 쿼리
- `messages`: 채팅방의 메시지 목록 조회
- `chatRooms`: 채팅방 목록 조회
- `chatRoom`: 특정 채팅방 조회

#### 뮤테이션
- `register`: 사용자 등록
- `login`: 사용자 로그인
- `createChatRoom`: 채팅방 생성
- `updateChatRoom`: 채팅방 수정
- `deleteChatRoom`: 채팅방 삭제
- `sendMessage`: 메시지 전송
- `updateMessage`: 메시지 수정
- `deleteMessage`: 메시지 삭제
- `markMessageAsRead`: 메시지 읽음 표시
- `markAllMessagesAsRead`: 모든 메시지 읽음 표시

### WebSocket 이벤트

#### 클라이언트 -> 서버
- `joinRoom`: 채팅방 입장
- `leaveRoom`: 채팅방 퇴장
- `sendMessage`: 메시지 전송
- `typing`: 타이핑 상태 전송
- `markAsRead`: 메시지 읽음 처리

#### 서버 -> 클라이언트
- `newMessage`: 새 메시지 수신
- `userJoined`: 사용자 입장 알림
- `userLeft`: 사용자 퇴장 알림
- `userTyping`: 타이핑 상태 알림
- `messageRead`: 메시지 읽음 상태 알림
- `messageUpdated`: 메시지 수정 알림
- `messageDeleted`: 메시지 삭제 알림
- `allMessagesRead`: 모든 메시지 읽음 상태 알림
