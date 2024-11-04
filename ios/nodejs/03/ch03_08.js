const os = require('os');

console.log(`Platform : ${os.platform()}`);
console.log(`Architecture: ${os.arch()}`);
console.log(`Cpu : ${os.cpus().length}`);
console.log(`Total Mem : ${os.totalmem()/1024/1024}`)
console.log(`Free Mem: ${os.freemem()/1024/1024}`)