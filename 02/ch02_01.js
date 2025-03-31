const fs = require("fs");
const fsPromises = require("fs").promises;

// 동기식 파일 읽기/쓰기
console.log("=== 동기식 파일 작업 ===");
try {
  // 파일 쓰기
  fs.writeFileSync("test.txt", "Hello World!");
  console.log("파일 쓰기 완료");

  // 파일 읽기
  const data = fs.readFileSync("test.txt", "utf8");
  console.log("파일 내용:", data);

  // 파일 정보 확인
  const stats = fs.statSync("test.txt");
  console.log("파일 크기:", stats.size);
  console.log("생성 시간:", stats.birthtime);
} catch (error) {
  console.error("에러:", error);
}

// 비동기식 파일 읽기/쓰기
console.log("\n=== 비동기식 파일 작업 ===");
fs.writeFile("async-test.txt", "Async Hello World!", (err) => {
  if (err) {
    console.error("쓰기 에러:", err);
    return;
  }
  console.log("비동기 파일 쓰기 완료");

  fs.readFile("async-test.txt", "utf8", (err, data) => {
    if (err) {
      console.error("읽기 에러:", err);
      return;
    }
    console.log("비동기 파일 내용:", data);
  });
});

// Promise 기반 파일 작업
console.log("\n=== Promise 기반 파일 작업 ===");
async function fileOperations() {
  try {
    await fsPromises.writeFile("promise-test.txt", "Promise Hello World!");
    console.log("Promise 파일 쓰기 완료");

    const data = await fsPromises.readFile("promise-test.txt", "utf8");
    console.log("Promise 파일 내용:", data);

    const stats = await fsPromises.stat("promise-test.txt");
    console.log("Promise 파일 크기:", stats.size);
  } catch (error) {
    console.error("Promise 에러:", error);
  }
}

fileOperations();
