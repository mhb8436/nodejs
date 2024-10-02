const fs = require('fs')

// const content = 'this is content'

// fs.writeFile('content.txt', content, err => {});

// fs.writeFileSync('content.txt', content);



const path = require('path');

// 파일 경로 합치기
const filePath = path.join(__dirname, 'folder', 'file.txt');

// const content = "test";
// fs.writeFileSync(filePath, content);
const patharr = filePath.split('/');
console.log(patharr.pop(), patharr.join('/'));


console.log(path.parse(filePath).base, path.parse(filePath).dir);

