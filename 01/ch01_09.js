// 구조 분해 할당(Destructuring Assignment) 예제
console.log("=== 구조 분해 할당 기본 예제 ===\n");

// 1. 배열 구조 분해 - 기본
console.log("1. 배열 구조 분해 - 기본");
const fruits = ["사과", "바나나", "오렌지"];

// 기본적인 배열 구조 분해
const [firstFruit, secondFruit, thirdFruit] = fruits;
console.log(`첫 번째 과일: ${firstFruit}`); // 사과
console.log(`두 번째 과일: ${secondFruit}`); // 바나나
console.log(`세 번째 과일: ${thirdFruit}\n`); // 오렌지

// 2. 배열 구조 분해 - 건너뛰기
console.log("2. 배열 구조 분해 - 건너뛰기");
const numbers = [1, 2, 3, 4, 5];

// 일부 요소 건너뛰기
const [one, , three] = numbers;
console.log(`첫 번째: ${one}`); // 1
console.log(`세 번째: ${three}\n`); // 3

// 3. 객체 구조 분해 - 기본
console.log("3. 객체 구조 분해 - 기본");
const student = {
  name: "김철수",
  age: 20,
  grade: "A",
};

// 기본적인 객체 구조 분해
const { name, age, grade } = student;
console.log(`이름: ${name}`); // 김철수
console.log(`나이: ${age}`); // 20
console.log(`성적: ${grade}\n`); // A

// 4. 객체 구조 분해 - 다른 이름으로 할당
console.log("4. 객체 구조 분해 - 다른 이름으로 할당");
const { name: studentName, age: studentAge } = student;
console.log(`학생 이름: ${studentName}`); // 김철수
console.log(`학생 나이: ${studentAge}\n`); // 20

// 5. 기본값 설정
console.log("5. 기본값 설정");
const person = {
  name: "이영희",
};

// 없는 속성에 기본값 설정
const { name: personName, age: personAge = 25 } = person;
console.log(`이름: ${personName}`); // 이영희
console.log(`나이: ${personAge}\n`); // 25 (기본값)

// 6. 실전 예제 - 함수 매개변수
console.log("6. 실전 예제 - 함수 매개변수");

// 객체를 매개변수로 받는 함수
function printStudentInfo({ name, age, grade = "B" }) {
  console.log(`학생 정보:`);
  console.log(`- 이름: ${name}`);
  console.log(`- 나이: ${age}`);
  console.log(`- 성적: ${grade}\n`);
}

printStudentInfo(student);

// 7. 실전 예제 - 배열과 객체 조합
console.log("7. 실전 예제 - 배열과 객체 조합");
const students = [
  { name: "김철수", age: 20 },
  { name: "이영희", age: 21 },
  { name: "박민수", age: 19 },
];

// 배열과 객체 구조 분해 조합
const [firstStudent, { name: secondName }, { age: thirdAge }] = students;
console.log(`첫 번째 학생: ${firstStudent.name}`);
console.log(`두 번째 학생 이름: ${secondName}`);
console.log(`세 번째 학생 나이: ${thirdAge}\n`);

// 8. 실전 예제 - 중첩 객체
console.log("8. 실전 예제 - 중첩 객체");
const user = {
  id: 1,
  info: {
    name: "홍길동",
    address: {
      city: "서울",
      street: "강남대로",
    },
  },
};

// 중첩 객체 구조 분해
const {
  id,
  info: {
    name: userName,
    address: { city, street },
  },
} = user;

console.log(`ID: ${id}`);
console.log(`이름: ${userName}`);
console.log(`도시: ${city}`);
console.log(`거리: ${street}`);
