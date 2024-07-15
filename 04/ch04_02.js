const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader('Content-Type', 'application/json');

    const data = {'name':'hello', 'value':'world'};
    if(path == '/json'){
        res.end(JSON.stringify(data));        
    }else{
        res.end('');
    }
    
}).listen(4500, ()=> console.log('Add Routing 2'));



