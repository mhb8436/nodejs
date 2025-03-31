require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const _ = require("lodash");

// 환경 변수 사용 예시
const config = {
  dbUrl: process.env.DB_URL,
  apiKey: process.env.API_KEY,
  nodeEnv: process.env.NODE_ENV,
  debug: process.env.DEBUG === "true",
};

// 환경 변수 검증
function validateConfig() {
  const requiredEnvVars = ["DB_URL", "API_KEY"];
  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `필수 환경 변수가 설정되지 않았습니다: ${missingVars.join(", ")}`
    );
  }
}

// 환경 변수 로깅 (개발 환경에서만)
if (config.nodeEnv === "development") {
  console.log("현재 환경 설정:", {
    ...config,
    apiKey: "***", // API 키는 보안을 위해 숨김
  });
}

// 환경 변수 검증 실행
validateConfig();

// 라우트 예시
app.get("/config", (req, res) => {
  res.json({
    environment: config.nodeEnv,
    debug: config.debug,
    dbUrl: config.dbUrl,
    apiKey: "***", // API 키는 보안을 위해 숨김
  });
});

// 1. 배열 조작
console.log("=== 배열 조작 ===");
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(
  "짝수만 필터링:",
  _.filter(numbers, (n) => n % 2 === 0)
);
console.log("배열 청크:", _.chunk(numbers, 3));
console.log("배열 중복 제거:", _.uniq([1, 2, 2, 3, 3, 4, 5]));
console.log("배열 차집합:", _.difference([1, 2, 3], [2, 3, 4]));
console.log("배열 교집합:", _.intersection([1, 2, 3], [2, 3, 4]));

// 2. 객체 조작
console.log("\n=== 객체 조작 ===");
const user = {
  name: "홍길동",
  age: 30,
  address: {
    city: "서울",
    street: "강남구",
  },
  hobbies: ["독서", "운동"],
};

console.log("객체 복사:", _.cloneDeep(user));
console.log("객체 병합:", _.merge({}, user, { age: 31 }));
console.log("객체 키 추출:", _.keys(user));
console.log("객체 값 추출:", _.values(user));
console.log("객체 펼치기:", _.flattenDeep(user));

// 3. 문자열 조작
console.log("\n=== 문자열 조작 ===");
const text = "  Hello, World!  ";
console.log("문자열 자르기:", _.trim(text));
console.log("문자열 반복:", _.repeat("*", 5));
console.log("문자열 시작 확인:", _.startsWith(text, "Hello"));
console.log("문자열 끝 확인:", _.endsWith(text, "World!"));

// 4. 숫자 조작
console.log("\n=== 숫자 조작 ===");
console.log("숫자 범위:", _.range(0, 5));
console.log("숫자 반올림:", _.round(3.14159, 2));
console.log("숫자 클램프:", _.clamp(10, 0, 5));
console.log("숫자 랜덤:", _.random(1, 10));

// 5. 함수형 프로그래밍
console.log("\n=== 함수형 프로그래밍 ===");
const users = [
  { id: 1, name: "홍길동", age: 30 },
  { id: 2, name: "김철수", age: 25 },
  { id: 3, name: "이영희", age: 35 },
];

console.log("사용자 나이 평균:", _.meanBy(users, "age"));
console.log("나이순 정렬:", _.sortBy(users, "age"));
console.log(
  "그룹화:",
  _.groupBy(users, (user) => (user.age > 30 ? "senior" : "junior"))
);

// 6. 유틸리티 함수
console.log("\n=== 유틸리티 함수 ===");
console.log("타입 확인:", _.isString("hello"));
console.log("빈 값 확인:", _.isEmpty([]));
console.log("객체 비교:", _.isEqual({ a: 1 }, { a: 1 }));
console.log(
  "함수 디바운스:",
  _.debounce(() => console.log("디바운스 실행"), 1000)
);

// 7. 컬렉션 조작
console.log("\n=== 컬렉션 조작 ===");
const collection = [
  { id: 1, name: "Item 1", active: true },
  { id: 2, name: "Item 2", active: false },
  { id: 3, name: "Item 3", active: true },
];

console.log(
  "조건에 맞는 첫 번째 항목:",
  _.find(collection, (item) => item.active)
);
console.log(
  "조건에 맞는 모든 항목:",
  _.filter(collection, (item) => item.active)
);
console.log(
  "조건에 맞는 항목 수:",
  _.countBy(collection, (item) => item.active)
);
console.log("ID로 항목 찾기:", _.keyBy(collection, "id"));

// 8. 고급 함수
console.log("\n=== 고급 함수 ===");
const memoized = _.memoize((n) => {
  console.log("계산 중...");
  return n * n;
});

console.log("메모이제이션 테스트:");
console.log(memoized(5));
console.log(memoized(5)); // 캐시된 결과 사용

const throttled = _.throttle(() => {
  console.log("쓰로틀링 실행");
}, 1000);

console.log("쓰로틀링 테스트:");
throttled();
throttled(); // 무시됨

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
