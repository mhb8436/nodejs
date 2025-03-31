# Chapter 05: Express.js와 템플릿 엔진

이 디렉토리는 Node.js에서 Express.js 프레임워크와 템플릿 엔진을 사용한 웹 애플리케이션 구현을 다루는 예제 코드를 포함하고 있습니다.

## 학습 목표

- Express.js 프레임워크 활용
- 템플릿 엔진 사용
- 라우팅 구현
- 미들웨어 활용
- 정적 파일 서빙
- JSON 데이터 처리
- MVC 패턴 적용
- 에러 처리

## 디렉토리 구조

- **ch05_01/**: 기본 Express.js 서버
  - app.js: 기본 서버 설정
  - views/: 템플릿 파일
- **ch05_02/**: 라우팅과 미들웨어
  - app.js: 라우팅 설정
  - views/: 템플릿 파일
- **ch05_03/**: JSON 데이터 처리
  - app.js: JSON API 구현
  - test.json: 테스트 데이터
  - views/: 템플릿 파일
- **ch05_04/**: MVC 패턴 구현
  - server.js: 메인 서버
  - public/: 정적 파일
  - views/: 템플릿 파일
  - test.json: 테스트 데이터

## 사용 방법

1. 이 디렉토리로 이동합니다:

   ```bash
   cd 05
   ```

2. 필요한 의존성을 설치합니다:

   ```bash
   npm install
   ```

3. 예제를 실행합니다:

   ```bash
   # ch05_01 디렉토리로 이동하여 기본 서버 실행
   cd ch05_01
   node app.js

   # ch05_04 디렉토리로 이동하여 MVC 서버 실행
   cd ../ch05_04
   node server.js
   ```

## 사전 준비

- Node.js가 설치되어 있어야 합니다
- npm이 설치되어 있어야 합니다
- Chapter 01-04의 내용을 이해하고 있어야 합니다

## 참고 사항

- Express.js는 Node.js의 대표적인 웹 프레임워크입니다
- 템플릿 엔진을 통해 동적 웹 페이지를 생성합니다
- 미들웨어를 통해 요청/응답 처리를 확장합니다
- MVC 패턴으로 코드를 구조화합니다
