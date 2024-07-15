const http = require('http');
const url = require('url');
const fs = require('fs')

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader('Content-Type', 'application/json');
    
    if(path == '/list'){        
        list(req, res);
    }else{
        res.end('');
    }
    
}).listen(4500, ()=> console.log('Refactoring Routing 1'));


const list = (req, res) => {
    const data = fs.readFileSync('test.json', 'utf-8');
    const result = JSON.parse(data);
    res.end(JSON.stringify(result));    
}


