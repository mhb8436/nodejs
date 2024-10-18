const http = require('http');

http.createServer((req, res)=>{
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    let arr = [];
    for(let i=0;i< 10;i++) {
        arr.push(`Hello World ${i+1}`);
    }
    const content = arr.join('\n');
    console.log(content);
    res.write(content);
    res.end();
}).listen(4500);