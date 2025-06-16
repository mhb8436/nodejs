// 함수 선언 방식들
// 1. 익명 함수
let add1 = function (x, y) {
  return x + y;
};

// 2. 선언 함수
function add2(x, y) {
  return x + y;
}

// 3. 화살표 함수
let add3 = (x, y) => x + y;

console.log(add1(1, 4));
console.log(add2(1, 4));
console.log(add3(1, 4));

// 콜백 함수
function tentimes(callback) {
  for (let i = 0; i < 10; i++) {
    callback();
  }
}

tentimes(function () {
  console.log("call function");
});

// 타이머 함수
// setTimeout
setTimeout(function () {
  console.log(`1초 후 호출`);
}, 1000);

// setInterval
setInterval(function () {
  console.log(`1초 마다 호출`);
}, 1000);

// 문자열을 숫자로 변환
// parseInt
console.log(`parseInt("52") => ${parseInt("52")}`);
console.log(`parseInt("3.14") => ${parseInt("3.14")}`);
console.log(`parseInt("1209동") => ${parseInt("1209동")}`);

// parseFloat
console.log(`parseFloat("51.128") => ${parseFloat("51.128")}`);
console.log(`parseFloat("3.14") => ${parseFloat("3.14")}`);
console.log(`parseFloat("1209.2동") => ${parseFloat("1209.2동")}`);



// 문제 1 배열 : [1, 2, "멈춰", 3, 4, true, false] 에서 멈춰가 나오면 멈추는 코드를 만들어보세요 


// 문제 2 배열 [5,10,15,20,25] 에서 20 이상이 나오면 멈추는 코드를 만들어보세요 


// 문제 3 배열 [1,2,3,4,5,6,7,8,9,10] 에서 짝수만 나오는 코드를 만들어보세요 continue 사용 


// 문제 4 1부터 10까지 돌면서 3의 배수는 건너뛰고 나머지를 출력하는 코드를 만들어보세요 


// 문제 5 배열 ["사과", 1, "바나나", 2, "포도", false ] 에서 문자열만 나오는 코드를 만들어보세요 


