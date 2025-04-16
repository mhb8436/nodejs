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

// 비동기 파일 작업과 다른 작업의 동시 실행 예시
console.log("\n=== 비동기 파일 작업과 다른 작업 동시 실행 ===");
async function concurrentOperations() {
  console.log("1. 작업 시작");

  // 파일 쓰기 작업 시작 (비동기)
  const writePromise = fsPromises.writeFile(
    "concurrent-test.txt",
    "Concurrent Hello World!"
  );
  console.log("2. 파일 쓰기 작업 시작됨");

  // 파일 쓰기 작업이 진행되는 동안 다른 작업 수행
  console.log("3. 다른 작업 수행 중...");
  for (let i = 0; i < 3; i++) {
    console.log(`   다른 작업 ${i + 1} 실행 중`);
    await new Promise((resolve) => setTimeout(resolve, 100)); // 100ms 대기
  }

  // 파일 쓰기 작업 완료 대기
  await writePromise;
  console.log("4. 파일 쓰기 완료");

  // 파일 읽기
  const data = await fsPromises.readFile("concurrent-test.txt", "utf8");
  console.log("5. 파일 내용:", data);
}

concurrentOperations();
