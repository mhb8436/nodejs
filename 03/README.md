# Chapter 03: Node.js 외부 모듈

이 디렉토리는 Node.js에서 자주 사용되는 외부 모듈들의 사용법을 다루는 예제 코드를 포함하고 있습니다. 각 예제는 실무에서 유용하게 활용할 수 있는 모듈들의 핵심 기능을 다루고 있습니다.

## 학습 목표

- 모듈 시스템 이해 (CommonJS, ES Modules)
- 로깅 시스템 구현
- 날짜/시간 처리
- 데이터 검증
- 환경 변수 관리
- 유틸리티 함수 활용

## 디렉토리 구조

- **ch03_01.js**: 모듈 시스템 예제

  - CommonJS 모듈 시스템
  - ES 모듈 시스템
  - 모듈 임포트/익스포트
  - 구조 분해 할당

- **ch03_02.js**: 로깅 시스템 예제 (winston)

  - 로거 설정
  - 로그 레벨 관리
  - 파일 로깅
  - 콘솔 로깅
  - 메타데이터 포함

- **ch03_03.js**: 날짜/시간 처리 예제 (moment.js, dayjs)

  - 날짜 포맷팅
  - 시간 연산
  - 시간대 변환
  - 날짜 비교
  - 상대적 시간 표시

- **ch03_04.js**: 데이터 검증 예제 (validator, uuid)

  - 이메일/URL/IP 검증
  - 전화번호/날짜 검증
  - 비밀번호 강도 검증
  - UUID 생성 및 검증
  - UUID 활용 사례

- **ch03_05.js**: 환경 변수 관리 예제 (dotenv)

  - 환경 변수 설정
  - 환경 변수 검증
  - 환경별 설정 관리
  - 보안 고려사항

- **ch03_06.js**: 유틸리티 함수 예제 (lodash)
  - 배열 조작
  - 객체 조작
  - 문자열 처리
  - 숫자 처리
  - 함수형 프로그래밍

## 사용 방법

1. 이 디렉토리로 이동합니다:

   ```bash
   cd 03
   ```

2. 필요한 패키지를 설치합니다:

   ```bash
   npm install
   ```

3. 예제를 실행합니다:

   ```bash
   # 모듈 시스템 예제
   node ch03_01.js

   # 로깅 시스템 예제
   node ch03_02.js

   # 날짜/시간 처리 예제
   node ch03_03.js

   # 데이터 검증 예제
   node ch03_04.js

   # 환경 변수 관리 예제
   node ch03_05.js

   # 유틸리티 함수 예제
   node ch03_06.js
   ```

## 사전 준비

- Node.js v14 이상이 설치되어 있어야 합니다
- npm이 설치되어 있어야 합니다
- .env 파일이 필요합니다 (ch03_05.js 예제용)
- 필요한 외부 모듈들이 package.json에 명시되어 있습니다

## 주의사항

- 외부 모듈 사용 시 버전 호환성을 확인하세요
- 환경 변수는 보안에 주의하여 관리하세요
- 로깅 시 적절한 로그 레벨을 사용하세요
- 날짜/시간 처리 시 시간대를 고려하세요
- UUID 생성 시 적절한 버전을 선택하세요

## 참고 자료

- [npm 공식 문서](https://docs.npmjs.com/)
- [Node.js 모듈 문서](https://nodejs.org/api/modules.html)
- [winston 문서](https://github.com/winstonjs/winston)
- [moment.js 문서](https://momentjs.com/docs/)
- [dayjs 문서](https://day.js.org/docs/)
- [validator 문서](https://github.com/validatorjs/validator.js)
- [uuid 문서](https://github.com/uuidjs/uuid)
- [dotenv 문서](https://github.com/motdotla/dotenv)
- [lodash 문서](https://lodash.com/docs/)
