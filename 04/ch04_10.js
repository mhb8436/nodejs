const express = require('express')
const fs = require('fs');
const app = express()
const port = 3000;

app.get('/list', (req,res) => {
    list(req, res)
});

const list = (req, res) => {
    const data = fs.readFileSync('test.json', 
        'utf-8');
    const result = JSON.parse(data);
    let table = [];
    let body = [];

    result['result'].forEach(x=> {
        body.push(`<tr><td>${x['title']}</td>
            <td>${x['content']}</td></tr>`);
    });
    
    table.push(`<table><th><td>Ttitle</td>
        <td>Content</td></th>${body.join('')}</table>`);
    res.send(table.join(''));
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


