// 변수 선언과 할당
let pi;
console.log(pi);
pi = 3.141592;
console.log(pi);

let pi2 = 3.141592;
console.log(pi2);

// 변수 사용 예제
let radius = 12;
console.log(`넓이 : ${pi * radius * radius}`);
console.log(`둘레 : ${pi * 2 * radius}`);

// 복합 할당 연산자
let output = "hello";
output += "world";
console.log(output);

// 증감 연산자
let num = 0;
num++;
console.log(`num++ : ${num}`);
num--;
console.log(`num-- : ${num}`);

// 전위/후위 증감 연산자
console.log(`num++ : ${num++}`); // 후위: 현재 값 반환 후 증가
console.log(`num-- : ${num--}`); // 후위: 현재 값 반환 후 감소

console.log(`++num : ${++num}`); // 전위: 증가 후 값 반환
console.log(`--num : ${--num}`); // 전위: 감소 후 값 반환

// 타입 변환
console.log(String(52));
console.log(typeof 52);
console.log(typeof String(52));

console.log(Number("45"));
console.log(Number(true));
console.log(Number("hello"));

console.log(isNaN(Number("hello")));

console.log(Boolean(0));
console.log(Boolean(NaN));
console.log(Boolean(1));
console.log(Boolean("Hello"));

// 자동 타입 변환
console.log(25 + 125); // 숫자 + 숫자
console.log("25" + 125); // 문자열 + 숫자
console.log("25" - 125); // 문자열 - 숫자
