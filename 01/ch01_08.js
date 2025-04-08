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
