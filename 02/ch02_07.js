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
const os = require("os");

// 시스템의 전체 메모리 정보
const totalMemory = os.totalmem();
const freeMemory = os.freemem();
console.log("\n시스템 메모리 정보 (MB):");
console.log(
  `전체 메모리: ${Math.round((totalMemory / 1024 / 1024) * 100) / 100} MB`
);
console.log(
  `사용 가능한 메모리: ${Math.round((freeMemory / 1024 / 1024) * 100) / 100} MB`
);
console.log(
  `사용 중인 메모리: ${
    Math.round(((totalMemory - freeMemory) / 1024 / 1024) * 100) / 100
  } MB`
);

// 프로세스 종료
setTimeout(() => {
  console.log("프로그램 종료");
  process.exit(0);
}, 5000);
