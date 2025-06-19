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

const os = require('os');

// 기본 시스템 정보
console.log('운영체제:', os.type());
console.log('플랫폼:', os.platform());
console.log('아키텍처:', os.arch());
console.log('버전:', os.release());
console.log('호스트명:', os.hostname());

// CPU 정보
console.log('\nCPU 정보:');
const cpus = os.cpus();
console.log(`CPU 코어 수: ${cpus.length}`);
console.log(`CPU 모델: ${cpus[0].model}`);
console.log(`CPU 속도: ${cpus[0].speed} MHz`);

// 메모리 정보 (GB 단위로 변환)
const totalMemoryGB = os.totalmem() / 1024 / 1024 / 1024;
const freeMemoryGB = os.freemem() / 1024 / 1024 / 1024;
console.log('\n메모리 정보:');
console.log(`총 메모리: ${totalMemoryGB.toFixed(2)} GB`);
console.log(`사용 가능한 메모리: ${freeMemoryGB.toFixed(2)} GB`);
console.log(`사용 중인 메모리: ${(totalMemoryGB - freeMemoryGB).toFixed(2)} GB`);

// 사용자 정보
const userInfo = os.userInfo();
console.log('\n사용자 정보:');
console.log(`사용자 이름: ${userInfo.username}`);
console.log(`홈 디렉토리: ${userInfo.homedir}`);
console.log(`쉘: ${userInfo.shell}`);

// 네트워크 인터페이스 정보
console.log('\n네트워크 인터페이스:');
const interfaces = os.networkInterfaces();
Object.keys(interfaces).forEach(iface => {
  interfaces[iface].forEach(details => {
    if (details.family === 'IPv4') {
      console.log(`${iface}: ${details.address}`);
    }
  });
});

// 시스템 업타임 (시간 형식으로 변환)
const uptime = os.uptime();
const hours = Math.floor(uptime / 3600);
const minutes = Math.floor((uptime % 3600) / 60);
const seconds = Math.floor(uptime % 60);
console.log('\n시스템 가동 시간:');
console.log(`${hours}시간 ${minutes}분 ${seconds}초`);

// 시스템 부하 평균
console.log('\n시스템 부하 평균 (1, 5, 15분):', os.loadavg());
