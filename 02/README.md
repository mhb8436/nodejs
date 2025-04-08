# Chapter 02: Node.js 내장 모듈

이 디렉토리는 Node.js의 주요 내장 모듈을 다루는 예제 코드를 포함하고 있습니다. 각 예제는 실무에서 자주 사용되는 모듈들의 핵심 기능을 다루고 있습니다.

## 학습 목표

- 파일 시스템(fs) 모듈 사용법
- 경로 처리(path) 모듈 사용법
- 이벤트(events) 모듈 사용법
- HTTP 서버 구현
- Buffer 처리
- Stream 처리
- Process 정보 관리

## 디렉토리 구조

- **ch02_01.js**: 파일 시스템(fs) 모듈 예제

  - 동기식/비동기식 파일 읽기/쓰기
  - Promise 기반 파일 작업
  - 파일 정보 확인
  - 디렉토리 생성 및 삭제

- **ch02_02.js**: 경로 처리(path) 모듈 예제

  - 경로 결합 및 분리
  - 파일 확장자 처리
  - 절대/상대 경로 변환
  - 경로 정규화
  - 크로스 플랫폼 경로 처리

- **ch02_03.js**: 이벤트(events) 모듈 예제

  - EventEmitter 상속
  - 이벤트 리스너 등록
  - 이벤트 발생 및 처리
  - 채팅방 시뮬레이션
  - 이벤트 에러 처리

- **ch02_04.js**: HTTP 모듈 예제

  - 기본 HTTP 서버 구현
  - 라우팅 처리
  - 요청/응답 처리
  - REST API 구현
  - HTTP 상태 코드 처리

- **ch02_05.js**: Buffer 모듈 예제

  - Buffer 생성 및 조작
  - 문자열 인코딩/디코딩
  - Buffer 비교 및 슬라이싱
  - Base64 변환
  - 바이너리 데이터 처리

- **ch02_06.js**: 배열 메서드 예제

  - filter: 조건에 맞는 요소 필터링
  - map: 요소 변환
  - reduce: 배열을 단일 값으로 축소
  - find: 조건에 맞는 첫 번째 요소 찾기
  - some/every: 조건 검사
  - sort: 배열 정렬
  - forEach: 각 요소 작업 수행
  - flatMap: map 후 flatten
  - reduce로 객체 생성

- **ch02_07.js**: Process 모듈 예제
  - 프로세스 정보 확인
  - 환경 변수 관리
  - 메모리 사용량 모니터링
  - 프로세스 종료 처리
  - 시그널 처리

## 사용 방법

1. 이 디렉토리로 이동합니다:

   ```bash
   cd 02
   ```

2. 예제를 실행합니다:

   ```bash
   # 파일 시스템 예제
   node ch02_01.js

   # 경로 처리 예제
   node ch02_02.js

   # 이벤트 처리 예제
   node ch02_03.js

   # HTTP 서버 예제
   node ch02_04.js
   # 브라우저에서 http://localhost:3000 접속

   # Buffer 예제
   node ch02_05.js

   # Stream 예제
   node ch02_06.js

   # Process 예제
   node ch02_07.js
   ```

## 사전 준비

- Node.js v14 이상이 설치되어 있어야 합니다
- 파일 시스템 접근 권한이 필요합니다
- HTTP 서버 예제의 경우 3000번 포트가 사용 가능해야 합니다
- 각 예제에 필요한 디렉토리 구조가 자동으로 생성됩니다

## 주의사항

- 파일 시스템 작업 시 적절한 에러 처리가 필요합니다
- 비동기 작업의 경우 콜백이나 Promise를 사용합니다
- HTTP 서버는 Ctrl+C로 종료할 수 있습니다
- Stream 작업 시 메모리 사용량에 주의합니다
- Process 모듈 사용 시 시스템 리소스를 고려합니다
- 예제 실행 전 필요한 디렉토리와 파일이 있는지 확인하세요

## 참고 자료

- [Node.js 공식 문서](https://nodejs.org/docs/)
- [Node.js 내장 모듈](https://nodejs.org/api/)
- [Stream 핸드북](https://github.com/substack/stream-handbook)
- [Buffer 문서](https://nodejs.org/api/buffer.html)
- [Node.js 모범 사례](https://github.com/goldbergyoni/nodebestpractices)
