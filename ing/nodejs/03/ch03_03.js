const fs = require('fs');

// fs.readFile('/etc/passwd','utf-8', (err, data)=>{
//     if(err) {
//         console.log('error', err);
//     }
//     console.log(data);
// });

const data = fs.readFileSync('hello.txt', 'utf-8');
console.log(data);
