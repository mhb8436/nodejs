/**
 * TypeScript 비동기 프로그래밍 학습
 *
 * 이 파일에서는 TypeScript의 비동기 프로그래밍을 학습합니다:
 * - Promise
 * - async/await
 * - 비동기 함수
 * - 에러 처리
 * - Promise 체이닝
 */

// 1. Promise 기본
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 실행 예시
console.log("=== Promise 기본 예제 ===");
console.log("시작");
delay(1000).then(() => console.log("1초 후 실행"));

// 2. Promise를 사용한 비동기 함수
function fetchUser(id: number): Promise<{ id: number; name: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: "홍길동" });
      } else {
        reject(new Error("유효하지 않은 ID"));
      }
    }, 1000);
  });
}

// 실행 예시
console.log("\n=== Promise 비동기 함수 예제 ===");
fetchUser(1)
  .then((user) => console.log("사용자 정보:", user))
  .catch((error) => console.error("에러:", error));

// 3. async/await 사용
async function getUser(id: number): Promise<void> {
  try {
    console.log("사용자 정보를 가져오는 중...");
    const user = await fetchUser(id);
    console.log("사용자:", user);
  } catch (error) {
    console.error("에러:", error);
  }
}

// 실행 예시
console.log("\n=== async/await 예제 ===");
getUser(1);
getUser(-1);

// 4. Promise.all 사용
async function fetchMultipleUsers(ids: number[]): Promise<void> {
  try {
    const promises = ids.map((id) => fetchUser(id));
    const users = await Promise.all(promises);
    console.log("모든 사용자:", users);
  } catch (error) {
    console.error("에러:", error);
  }
}

// 실행 예시
console.log("\n=== Promise.all 예제 ===");
fetchMultipleUsers([1, 2, 3]);

// 5. Promise.race 사용
async function raceExample(): Promise<void> {
  const fastPromise = delay(1000).then(() => "빠른 작업 완료");
  const slowPromise = delay(2000).then(() => "느린 작업 완료");

  const result = await Promise.race([fastPromise, slowPromise]);
  console.log("경주 결과:", result);
}

// 실행 예시
console.log("\n=== Promise.race 예제 ===");
raceExample();

// 6. Promise 체이닝
function processUser(id: number): Promise<string> {
  return fetchUser(id)
    .then((user) => {
      console.log("사용자 처리 중:", user);
      return user.name;
    })
    .then((name) => {
      console.log("이름 처리 중:", name);
      return name.toUpperCase();
    })
    .catch((error) => {
      console.error("처리 중 에러:", error);
      throw error;
    });
}

// 실행 예시
console.log("\n=== Promise 체이닝 예제 ===");
processUser(1)
  .then((result) => console.log("최종 결과:", result))
  .catch((error) => console.error("최종 에러:", error));
