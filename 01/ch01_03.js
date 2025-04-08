// 타입 확인
console.log(typeof 10); // number
console.log(typeof "hello"); // string
console.log(typeof true); // boolean
console.log(typeof function () {}); // function
console.log(typeof {}); // object

let beta;
console.log(typeof beta); // undefined

// 비교 연산자
console.log(`50 == "50" : ${50 == "50"}`); // 동등 연산자 (타입 변환 후 비교)
console.log(`50 === "50" : ${50 === "50"}`); // 일치 연산자 (타입까지 비교)

console.log(`0 == "" : ${0 == ""}`); // true (타입 변환 후 비교)
console.log(`0 === "" : ${0 === ""}`); // false (타입이 다름)

// const 선언
const test = "변경 불가";
console.log(`before : ${test}`);
// test = "hello";  // 에러 발생: const는 재할당 불가
console.log(`after : ${test}`);

const abc = "abc";
// const def;  // 에러 발생: const는 초기값 필요
