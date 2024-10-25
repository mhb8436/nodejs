const http = require('http');

http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");    
    res.write("Hello World");    
    res.end();
}).listen(4500);