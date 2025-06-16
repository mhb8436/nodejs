// 예외 처리
try {
  const arr = new Array(-1);
} catch (e) {
  console.log(`exception occured : ${e}`);
} finally {
  console.log(`finally called`);
}

// 커스텀 에러
try {
  const err = new Error("This is Error");
  err.name = "My Error";
  err.message = "My Error Message";

  throw err;
} catch (e) {
  console.log(`exception occured => 
        name:${e.name}, message: ${e.message}`);
} finally {
  console.log(`finally called`);
}

// 콜백을 이용한 비동기 처리
function fetchData(callback) {
  setTimeout(() => {
    const data = "서버에서 받은 데이터";
    callback(data); // 작업이 완료된 후 콜백 호출
  }, 1000); // 1초 후 데이터 반환
}

function handleData(data) {
  console.log("콜백으로 받은 데이터:", data);
}

fetchData(handleData);

// Promise를 이용한 비동기 처리
function fetchDataPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true; // 작업 성공 여부
      if (success) {
        resolve("서버에서 받은 데이터");
      } else {
        reject("데이터 요청 실패");
      }
    }, 1000); // 1초 후 결과 반환
  });
}

fetchDataPromise()
  .then((data) => {
    console.log("프라미스로 받은 데이터:", data);
  })
  .catch((error) => {
    console.error("에러:", error);
  });

// async/await를 이용한 비동기 처리
async function getData() {
  try {
    const data = await fetchDataPromise();
    console.log("async/await로 받은 데이터:", data);
  } catch (error) {
    console.error("에러:", error);
  }
}

getData();

// 문제 1  2초 후에 "안녕하세요!"라는 메시지를 출력하는 Promise를 만들고 실행하세요

// 간단한 타이머 Promise
function greet() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("안녕하세요!");
    }, 2000);
  });
}

// Promise 사용하기
greet().then((message) => {
  console.log(message);
});


// 문제 2 숫자를 입력받아 그 숫자가 짝수인지 홀수인지 알려주는 Promise 함수를 만드세요.
// 짝수/홀수 확인 Promise
function checkEvenOdd(number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (number % 2 === 0) {
        resolve(`${number}는 짝수입니다.`);
      } else {
        resolve(`${number}는 홀수입니다.`);
      }
    }, 1000);
  });
}

// Promise 사용하기
checkEvenOdd(4).then((result) => {
  console.log(result);
});

checkEvenOdd(7).then((result) => {
  console.log(result);
});

// 문제 3 위에서 만든 greet 함수를 async/await를 사용하여 호출하는 함수를 만드세요.
// async/await 사용하기
async function sayHello() {
  console.log("인사말을 기다리는 중...");
  const message = await greet();
  console.log(message);
}

// 문제 4  파일 다운로드를 시뮬레이션하는 간단한 Promise 함수를 만들고, 이를 async/await로 사용하세요. 다운로드는 3초가 걸리고, 완료되면 "파일 다운로드 완료!" 메시지를 출력하세요
// 파일 다운로드 시뮬레이션

function downloadFile() {
  return new Promise((resolve) => {
    console.log("파일 다운로드 중...");
    setTimeout(() => {
      resolve("파일 다운로드 완료!");
    }, 3000);
  });
}

// async/await로 사용하기
async function startDownload() {
  console.log("다운로드를 시작합니다.");
  const result = await downloadFile();
  console.log(result);
}

// 함수 호출
startDownload();


// 문제 5


