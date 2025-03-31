let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (var i = 11; i < 21; i++) {
  data.push(i);
}
console.log(data);

const data2 = data.map((x) => x * 2);
console.log(data2);

const data3 = data.filter((x) => x % 2 == 0);
console.log(data3);

data.forEach((x) => {
  if (x >= 5 && x <= 15) {
    console.log(x);
  }
});

// 프로세스 정보
console.log("Node.js 버전:", process.version);
console.log("플랫폼:", process.platform);
console.log("아키텍처:", process.arch);

// 환경 변수
console.log("\n환경 변수:");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PATH:", process.env.PATH);

// 프로세스 시그널 처리
process.on("SIGINT", () => {
  console.log("\n프로그램 종료");
  process.exit();
});

// 메모리 사용량
console.log("\n메모리 사용량:");
console.log("힙 사용량:", process.memoryUsage().heapUsed);
console.log("힙 전체:", process.memoryUsage().heapTotal);

// 프로세스 종료
setTimeout(() => {
  console.log("프로그램 종료");
  process.exit(0);
}, 5000);
