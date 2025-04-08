// 샘플 데이터
const users = [
  { id: 1, name: "홍길동", age: 25, score: 85 },
  { id: 2, name: "김철수", age: 30, score: 92 },
  { id: 3, name: "이영희", age: 22, score: 78 },
  { id: 4, name: "박민수", age: 28, score: 88 },
  { id: 5, name: "최지원", age: 35, score: 95 },
];

// 1. filter: 조건에 맞는 요소만 필터링
console.log("\n=== filter 예제 ===");
const youngUsers = users.filter((user) => user.age < 30);
console.log("30세 미만 사용자:", youngUsers);

// 2. map: 각 요소를 변환
console.log("\n=== map 예제 ===");
const userNames = users.map((user) => user.name);
console.log("사용자 이름만 추출:", userNames);

// 3. reduce: 배열을 단일 값으로 축소
console.log("\n=== reduce 예제 ===");
const totalScore = users.reduce((sum, user) => sum + user.score, 0);
console.log("전체 점수 합계:", totalScore);
console.log("평균 점수:", totalScore / users.length);

// 4. find: 조건에 맞는 첫 번째 요소 찾기
console.log("\n=== find 예제 ===");
const highScoreUser = users.find((user) => user.score > 90);
console.log("90점 이상인 첫 번째 사용자:", highScoreUser);

// 5. some: 조건을 만족하는 요소가 하나라도 있는지 확인
console.log("\n=== some 예제 ===");
const hasPerfectScore = users.some((user) => user.score === 100);
console.log("만점자가 있는가?:", hasPerfectScore);

// 6. every: 모든 요소가 조건을 만족하는지 확인
console.log("\n=== every 예제 ===");
const allAdults = users.every((user) => user.age >= 20);
console.log("모든 사용자가 성인인가?:", allAdults);

// 7. sort: 배열 정렬
console.log("\n=== sort 예제 ===");
const sortedByAge = [...users].sort((a, b) => a.age - b.age);
console.log("나이순 정렬:", sortedByAge);

// 8. forEach: 각 요소에 대해 작업 수행
console.log("\n=== forEach 예제 ===");
users.forEach((user) => {
  console.log(`${user.name}님의 점수는 ${user.score}점입니다.`);
});

// 9. flatMap: map 후 flatten
console.log("\n=== flatMap 예제 ===");
const hobbies = [
  { name: "홍길동", hobbies: ["독서", "운동"] },
  { name: "김철수", hobbies: ["영화", "음악"] },
];
const allHobbies = hobbies.flatMap((person) => person.hobbies);
console.log("모든 취미:", allHobbies);

// 10. reduce로 객체 생성
console.log("\n=== reduce로 객체 생성 ===");
const userMap = users.reduce((acc, user) => {
  acc[user.id] = user;
  return acc;
}, {});
console.log("ID를 키로 하는 사용자 맵:", userMap);
