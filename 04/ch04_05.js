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

const edit = (req, res) => {
    const param = url.parse(req.url, true).query;
    const id = param.id;
    const title = param.title;
    const content = param.content;

    const data = fs.readFileSync('test.json', 'utf-8');
    const result = JSON.parse(data);
    const posts = result['result'];
    const newPosts = [];
    posts.forEach(item=> {
        if(item.id == id) {
            item.title = title;
            item.content = content;
            newPosts.push(item);
        }else {
            newPosts.push(item);
        }
    });
    const newData = {
        'result': newPosts
    }
    fs.writeFileSync("test.json", JSON.stringify(newData));
    res.end("")

}

const remove = (req, res) => {
    const param = url.parse(req.url, true).query;
    const id = param.id;
    const data = fs.readFileSync('test.json', 'utf-8');
    const result = JSON.parse(data);
    const posts = result['result'];
    const newPosts = posts.filter(item=>{
        return item.id != id;
    });
    const newData = {
        'result': newPosts
    }
    fs.writeFileSync("test.json", JSON.stringify(newData));
    res.end("")
}

const urlMap = {
    '/' : (req, res) => res.end('HOME'),
    '/list': list,
    '/edit': edit,
    '/remove': remove,
}

