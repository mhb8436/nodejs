const fs = require('fs');

let result = [];
for(let i=0;i<10;i++){
    result.push(
        {'title': '나는 제목이야('+i+')', 'content':'내용입니다('+i+')'}
    );
}
// console.log(JSON.stringify(result));
const data = {
    'result' : result
}
const strData = JSON.stringify(data);
fs.writeFileSync('test.json', strData, 'utf-8');
