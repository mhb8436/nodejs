const fs = require('fs');

const dirname = 'naver/daum/google';
fs.mkdirSync(dirname, {recursive: true});
const content = "test";
//fs.writeFileSync 를 이용하여 naver/daum/google/out.txt 만들어보세요 
fs.writeFileSync(dirname + '/out.txt', content);