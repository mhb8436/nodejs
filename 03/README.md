# Chapter 03: Node.js 모듈 시스템과 외장 모듈

이 디렉토리는 Node.js의 모듈 시스템과 자주 사용되는 외장 모듈의 사용법을 다루는 예제 코드를 포함하고 있습니다.

## 학습 목표

- Node.js 모듈 시스템 이해
- 주요 외장 모듈 설치 및 사용법
- Express.js 웹 프레임워크
- 데이터베이스 연동 (Mongoose)
- 파일 업로드 처리 (Multer)
- 환경 변수 관리 (dotenv)
- 로깅 시스템 (Winston)
- 유틸리티 모듈 활용

## 디렉토리 구조

- **ch03_01.js**: Node.js 모듈 시스템 기초

  - CommonJS 모듈 시스템
  - ES 모듈 시스템
  - 모듈 내보내기/가져오기
  - 모듈 캐싱

- **ch03_02.js**: Express.js 웹 프레임워크

  - Express 서버 설정
  - 라우팅 처리
  - 미들웨어 사용
  - 정적 파일 서빙

- **ch03_03.js**: MongoDB 연동 (Mongoose)

  - 데이터베이스 연결
  - 스키마 정의
  - CRUD 작업
  - 관계 설정

- **ch03_04.js**: 유틸리티 모듈 활용

  - moment.js: 날짜/시간 처리
  - lodash: 유틸리티 함수
  - validator: 데이터 검증
  - uuid: 고유 ID 생성
  - crypto-js: 암호화/복호화

- **ch03_05.js**: 환경 변수 관리 (dotenv)

  - 환경 변수 설정
  - 개발/운영 환경 분리
  - 보안 정보 관리
  - 설정 파일 구조화

- **ch03_06.js**: 로깅 시스템 (Winston)
  - 로그 레벨 설정
  - 파일/콘솔 로깅
  - 로그 포맷팅
  - 에러 추적

## 사용 방법

1. 이 디렉토리로 이동합니다:

   ```bash
   cd 03
   ```

2. 필요한 패키지를 설치합니다:

   ```bash
   npm install express mongoose multer dotenv winston moment lodash validator uuid crypto-js
   ```

3. 예제를 실행합니다:

   ```bash
   # 모듈 시스템 기초
   node ch03_01.js

   # Express 서버
   node ch03_02.js
   # 브라우저에서 http://localhost:3000 접속

   # MongoDB 연동
   node ch03_03.js

   # 유틸리티 모듈
   node ch03_04.js

   # 환경 변수
   node ch03_05.js

   # 로깅 시스템
   node ch03_06.js
   ```

## 사전 준비

- Node.js가 설치되어 있어야 합니다
- npm이 설치되어 있어야 합니다
- MongoDB가 설치되어 있어야 합니다 (ch03_03.js 예제용)
- 인터넷 연결이 필요합니다 (패키지 설치용)

## 주의사항

- MongoDB 연결 문자열을 올바르게 설정해야 합니다
- 파일 업로드 시 저장 경로가 존재하는지 확인합니다
- 환경 변수 파일(.env)이 올바르게 설정되어 있어야 합니다
- 로그 파일의 권한을 확인합니다
- 암호화 키는 안전하게 관리해야 합니다

## 참고 자료

- [Express.js 공식 문서](https://expressjs.com/)
- [Mongoose 문서](https://mongoosejs.com/docs/)
- [Multer 문서](https://github.com/expressjs/multer)
- [dotenv 문서](https://github.com/motdotla/dotenv)
- [Winston 문서](https://github.com/winstonjs/winston)
- [Moment.js 문서](https://momentjs.com/docs/)
- [Lodash 문서](https://lodash.com/docs/)
- [Validator.js 문서](https://github.com/validatorjs/validator.js)
- [UUID 문서](https://github.com/uuidjs/uuid)
- [CryptoJS 문서](https://github.com/brix/crypto-js)
