const http = require('http');

http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    const arr = [...Array(10).keys()];
    console.log(arr);
    const arr2 = arr.map(x=> {
        return 'Hello World ' + (x+1);
    });
    const content = arr2.join('\n');
    res.write(content);
    res.end();
}).listen(5000);


