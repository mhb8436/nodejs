// 기본 조건문
let date = new Date();

if (date.getHours() < 12) {
  console.log(`오전입니다 : ${date.getHours()}`);
} else if (date.getHours() >= 12) {
  console.log(`오후입니다 : ${date.getHours()}`);
}

// 1. 삼항 연산자
const hour = date.getHours();
const timeOfDay = hour < 12 ? "오전" : "오후";
console.log(`현재는 ${timeOfDay}입니다.`);

// 2. 중첩된 조건문
const temperature = 25;
if (temperature > 30) {
  console.log("더운 날씨입니다.");
} else if (temperature > 20) {
  console.log("따뜻한 날씨입니다.");
} else if (temperature > 10) {
  console.log("선선한 날씨입니다.");
} else {
  console.log("추운 날씨입니다.");
}

// 3. 논리 연산자를 사용한 조건문
const age = 20;
const hasLicense = true;

if (age >= 18 && hasLicense) {
  console.log("운전이 가능합니다.");
} else if (age >= 18 && !hasLicense) {
  console.log("면허가 필요합니다.");
} else {
  console.log("운전이 불가능합니다.");
}

// 4. switch 문
const day = date.getDay();
switch (day) {
  case 0:
    console.log("일요일");
    break;
  case 1:
    console.log("월요일");
    break;
  case 2:
    console.log("화요일");
    break;
  case 3:
    console.log("수요일");
    break;
  case 4:
    console.log("목요일");
    break;
  case 5:
    console.log("금요일");
    break;
  case 6:
    console.log("토요일");
    break;
  default:
    console.log("알 수 없는 요일");
}

// 5. 짧은 조건문 (Short-circuit evaluation)
const name = "";
const displayName = name || "익명";
console.log(`환영합니다, ${displayName}님!`);

// 6. 복합 조건문
const score = 85;
const attendance = 90;

if (score >= 90 && attendance >= 90) {
  console.log("A+");
} else if (score >= 80 && attendance >= 80) {
  console.log("B+");
} else if (score >= 70 && attendance >= 70) {
  console.log("C+");
} else {
  console.log("F");
}

// 7. nullish 병합 연산자
const userInput = null;
const defaultValue = "기본값";
const result = userInput ?? defaultValue;
console.log(`결과: ${result}`);

// 8. 조건부 실행
const isLoggedIn = true;
isLoggedIn && console.log("로그인 상태입니다.");

// 9. 다중 조건 검사
const fruit = "사과";
if (fruit === "사과" || fruit === "배" || fruit === "복숭아") {
  console.log("과일입니다.");
} else {
  console.log("과일이 아닙니다.");
}

// 10. 조건문을 사용한 배열 필터링
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log("짝수:", evenNumbers);
