# Chapter 03: Node.js 모듈 시스템과 외장 모듈

이 디렉토리는 Node.js의 모듈 시스템과 자주 사용되는 외장 모듈의 사용법을 다루는 예제 코드를 포함하고 있습니다.

## 학습 목표

- Node.js 모듈 시스템 이해
- 주요 외장 모듈 설치 및 사용법
- Express.js 웹 프레임워크
- 로깅 시스템 (Winston)
- 날짜/시간 처리 (Moment.js, Day.js)
- 데이터 검증 (Validator)
- 파일 시스템 확장 (fs-extra)
- UUID 생성 및 암호화
- 환경 변수 관리 (dotenv)

## 디렉토리 구조

- **ch03_01.js**: Node.js 모듈 시스템 기초

  - CommonJS 모듈 시스템
  - ES 모듈 시스템
  - 모듈 내보내기/가져오기
  - 모듈 캐싱

- **ch03_02.js**: 로깅 시스템 (Winston)

  - 로그 레벨 설정
  - 파일/콘솔 로깅
  - 로그 포맷팅
  - 로그 로테이션
  - 예외 처리
  - 로그 필터링
  - 메타데이터 포함

- **ch03_03.js**: 환경 변수 관리 (dotenv)

  - 환경 변수 설정
  - 개발/운영 환경 분리
  - 보안 정보 관리
  - 설정 파일 구조화
  - 환경 변수 검증
  - 타입 변환
  - 환경 변수 암호화
  - 환경 변수 파일 자동 생성

- **ch03_04.js**: 날짜/시간 처리 및 데이터 검증

  - Moment.js: 날짜/시간 처리
  - Day.js: 가벼운 날짜/시간 처리
  - Validator: 데이터 검증

- **ch03_05.js**: 환경 변수 관리 (dotenv)

  - 환경 변수 설정
  - 개발/운영 환경 분리
  - 보안 정보 관리
  - 설정 파일 구조화

- **ch03_06.js**: UUID, 암호화, 디버깅, 파일 시스템
  - UUID 생성 및 검증
  - 암호화/복호화
  - 디버깅 (debug)
  - 파일 시스템 확장 (fs-extra)

## 사용 방법

1. 이 디렉토리로 이동합니다:

   ```bash
   cd 03
   ```

2. 필요한 패키지를 설치합니다:

   ```bash
   npm install express dotenv winston moment dayjs validator uuid debug fs-extra
   ```

3. 예제를 실행합니다:

   ```bash
   # 모듈 시스템 기초
   node ch03_01.js

   # 로깅 시스템
   node ch03_02.js

   # 환경 변수 관리
   node ch03_03.js

   # 날짜/시간 처리 및 데이터 검증
   node ch03_04.js

   # 환경 변수
   node ch03_05.js

   # UUID, 암호화, 디버깅, 파일 시스템
   node ch03_06.js
   ```

## 사전 준비

- Node.js가 설치되어 있어야 합니다
- npm이 설치되어 있어야 합니다
- 인터넷 연결이 필요합니다 (패키지 설치용)

## 주의사항

- 환경 변수 파일(.env)이 올바르게 설정되어 있어야 합니다
- 로그 파일의 권한을 확인합니다
- 암호화 키는 안전하게 관리해야 합니다
- fs-extra 사용 시 파일 시스템 권한을 확인합니다

## 참고 자료

- [Express.js 공식 문서](https://expressjs.com/)
- [dotenv 문서](https://github.com/motdotla/dotenv)
- [Winston 문서](https://github.com/winstonjs/winston)
- [Moment.js 문서](https://momentjs.com/docs/)
- [Day.js 문서](https://day.js.org/docs/)
- [Validator.js 문서](https://github.com/validatorjs/validator.js)
- [UUID 문서](https://github.com/uuidjs/uuid)
- [Debug 문서](https://github.com/debug-js/debug)
- [fs-extra 문서](https://github.com/jprichardson/node-fs-extra)
