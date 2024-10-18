let output = '';

for(let i=0;i<10;i++) {
    for(let j=0;j< 10 - i;j++) { // left 공백 추가 
        output += ' '
    }
    for(let j=0;j< i+1;j++) { // * 추가 
        output += '*';
    }
    output += '\n';
}

console.log(output);