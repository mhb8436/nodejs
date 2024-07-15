const http = require('http');
const url = require('url');
const fs = require('fs')

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    const param = url.parse(req.url, true).query;
    
    res.setHeader('Content-Type', 'application/json');
    
    if(path == '/list'){        
        const data = fs.readFileSync('test.json', 'utf-8');
        let result = JSON.parse(data);
        if(param.title && param.content) {
            result['result'].push({
                'title': param.title, 'content': param.content
            });
        }

        res.end(JSON.stringify(result));        
    }else{
        res.end('');
    }
    
}).listen(4500, ()=> console.log('manage parameter'));



