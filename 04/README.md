# Chapter 04: HTTP 서버와 라우팅

이 디렉토리는 Node.js의 기본 HTTP 서버 구현과 라우팅 처리를 다루는 예제 코드를 포함하고 있습니다.

## 학습 목표

- HTTP 서버 구현
- URL 파싱과 라우팅
- 요청/응답 처리
- JSON 데이터 처리
- 파일 시스템 연동
- RESTful API 구현
- 에러 처리
- 코드 리팩토링

## 디렉토리 구조

- **ch04_01.js**: 기본 라우팅 구현
- **ch04_02.js**: URL 파라미터 처리
- **ch04_03.js**: JSON 응답 처리
- **ch04_04.js**: 파일 시스템 연동
- **ch04_05.js**: RESTful API 구현
  - 목록 조회 (/list)
  - 수정 (/edit)
  - 삭제 (/remove)
- **ch04_06.js**: 에러 처리
- **ch04_07.js**: 비동기 처리
- **ch04_08.js**: 미들웨어 패턴
- **ch04_09.js**: 라우터 모듈화
- **ch04_10.js**: 고급 라우팅 패턴
- **test.json**: 테스트 데이터

## 사용 방법

1. 이 디렉토리로 이동합니다:

   ```bash
   cd 04
   ```

2. 예제를 실행합니다:

   ```bash
   # 기본 라우팅 예제 실행
   node ch04_01.js

   # RESTful API 예제 실행
   node ch04_05.js
   ```

3. API 테스트:

   ```bash
   # 목록 조회
   curl http://localhost:4500/list

   # 게시글 수정
   curl "http://localhost:4500/edit?id=1&title=수정&content=내용"

   # 게시글 삭제
   curl "http://localhost:4500/remove?id=1"
   ```

## 사전 준비

- Node.js가 설치되어 있어야 합니다
- Chapter 01-03의 내용을 이해하고 있어야 합니다

## 참고 사항

- HTTP 서버는 기본 모듈만 사용합니다
- 라우팅은 URL 파싱을 통해 구현합니다
- JSON 데이터는 파일 시스템에 저장됩니다
- 비동기 처리를 통해 성능을 개선합니다
