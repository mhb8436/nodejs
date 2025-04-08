// lodash 예제
// npm i lodash
const _ = require("lodash");
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

// 5. 함수
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
