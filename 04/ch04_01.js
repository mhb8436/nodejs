const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader('Content-Type', 'text/html');

    if(path == '/hello'){
        res.end('<h1>hello</h1>');
    }else if(path == '/world') {
        res.end('<h1>world</h1>');
    }else{
        res.end('<h1>hi</h1>');
    }
    
}).listen(4500, ()=> console.log('Add Routing'));



