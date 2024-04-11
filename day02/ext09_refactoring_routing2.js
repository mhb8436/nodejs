const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader('Content-Type', 'application/json');
    
    if(path in urlMap){
        urlMap[path](req,res)
    }
    
}).listen(4500, ()=> console.log('Refactoring Routing 2'));

const list = (req, res) => {
    const data = fs.readFileSync('test.json', 'utf-8');
    const result = JSON.parse(data);
    res.end(JSON.stringify(result));    
}

const urlMap = {
    '/' : (req, res) => res.end('HOME'),
    '/list': list
}

