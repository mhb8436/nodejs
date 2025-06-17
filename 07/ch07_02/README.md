# API 테스트 도구 활용

이 예제는 API 테스트에 사용되는 다양한 도구들의 사용법을 보여줍니다.

## 주요 내용

1. Postman 사용법

   - GET 요청 보내기
   - POST 요청과 JSON 바디
   - 요청 헤더 설정
   - 환경 변수 사용

2. curl 명령어

   - 기본 GET 요청
   - POST 요청과 데이터 전송
   - 헤더 추가
   - 응답 헤더 보기

3. console.log 디버깅
   - 요청 정보 로깅
   - 응답 정보 로깅
   - 에러 정보 로깅

## 실행 방법

1. 패키지 설치:

   ```bash
   npm install
   ```

2. 서버 실행:
   ```bash
   npm run dev
   ```

## API 테스트 예시

### curl 사용

1. GET 요청:

   ```bash
   curl http://localhost:3000/api/hello
   ```

2. POST 요청:

   ```bash
   curl -X POST http://localhost:3000/api/echo \
   -H "Content-Type: application/json" \
   -d '{"message": "테스트"}'
   ```

3. 헤더 포함:

   ```bash
   curl http://localhost:3000/api/echo \
   -H "Custom-Header: test-value"
   ```

4. 응답 헤더 보기:
   ```bash
   curl -i http://localhost:3000/api/hello
   ```

### Postman 사용

1. 새 요청 생성

   - 요청 URL: `http://localhost:3000/api/hello`
   - 메소드: GET
   - Send 클릭

2. POST 요청 설정

   - 요청 URL: `http://localhost:3000/api/echo`
   - 메소드: POST
   - Body 탭 선택
   - raw 선택, JSON 형식 선택
   - 데이터 입력:
     ```json
     {
       "message": "Postman 테스트"
     }
     ```

3. 환경 변수 설정
   - 환경 생성: "Local"
   - 변수 추가: "baseUrl" = "http://localhost:3000"
   - 요청 URL에서 사용: `{{baseUrl}}/api/hello`

## 콘솔 출력 설명

서버를 실행하면 다음과 같은 정보가 콘솔에 출력됩니다:

1. morgan 로그

   - HTTP 메소드
   - URL
   - 상태 코드
   - 응답 시간

2. 상세 요청 정보

   - URL
   - 메소드
   - 헤더
   - 바디
   - 쿼리 파라미터

3. 상세 응답 정보

   - 상태 코드
   - 응답 바디

4. 에러 발생 시
   - 에러 메시지
   - 스택 트레이스
