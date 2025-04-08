// 배열 선언
let arr = [5, 23, "hello", true, "world", -9];
console.log(arr);
console.log(arr[2]);

// while 반복문
let i = 0;
while (i < arr.length) {
  console.log(` ${i} is ${arr[i]}`);
  i++;
}

// for 반복문
for (let i = 0; i < arr.length; i++) {
  console.log(` ${i} is ${arr[i]}`);
}

// for...in 반복문 (배열의 인덱스 순회)
for (i in arr) {
  console.log(` ${i} is ${arr[i]}`);
}

// for...of 반복문 (배열의 값 순회)
for (e of arr) {
  console.log(` ${e}`);
}

// 중첩 반복문 (별찍기)
let output = "";
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10 - i; j++) {
    output += " ";
  }
  for (let j = 0; j < i + 1; j++) {
    output += "*";
  }
  output += "\n";
}
console.log(output);

// break 문
for (i in arr) {
  if (typeof arr[i] == "string") {
    break;
  }
  console.log(arr[i]);
}

// continue 문
for (i in arr) {
  if (typeof arr[i] == "string") {
    console.log(arr[i]);
    continue;
  }
  console.log(arr[i]);
}

// 조건문을 사용한 배열 필터링
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log("짝수:", evenNumbers);
