const express = require('express');
const fs = require('fs');
var moment = require('moment');

var app = express();

app.use(express.json());

app.get('/list', (req, res) => {
    const result = fs.readFileSync('test.json','utf-8');
    const data = JSON.parse(result);

    res.json(data);
});

app.get('/detail/:id', (req, res) => {
    const id = req.params.id;

    const result = fs.readFileSync('test.json', 'utf-8');
    const data = JSON.parse(result); 
    let detail = {};

    data['result'].forEach((item) => {
        if(item['id'] == id) {
            detail = item;
        }
    });
    res.json({detail:detail})
});

app.post('/write', (req, res) => {
    console.log(req.body);
    const result = fs.readFileSync('test.json', 'utf-8');
    let data = JSON.parse(result);
    
    const last = data['result'].slice(-1);
    const last_id = last[0]['id'] + 1;
    const write_date = moment().format('YYYY-MM-DD');
    data['result'].push({
        'id': last_id, 'title': req.body.title, 'content': req.body.content, 
        'writer':'tester' , 'write_date': write_date
    });

    fs.writeFileSync('test.json', JSON.stringify(data), 'utf-8');
    res.redirect('/list');
});


app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    
    const result = fs.readFileSync('test.json', 'utf-8');
    let data = JSON.parse(result); 

    for(item of data['result']) {
        if(item['id'] == id) {
            item['title'] = req.body.title;
            item['content'] = req.body.content;
        }
    }

    fs.writeFileSync('test.json', JSON.stringify(data), 'utf-8');
    res.redirect('/detail/'+id)
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    const result = fs.readFileSync('test.json', 'utf-8');
    let data = JSON.parse(result); 

    let element_idx = 0;

    data['result'].forEach((e, i) => {
        if(e['id'] == id) {
            element_idx = i;
        }
    });
    data['result'].splice(element_idx, 1);

    fs.writeFileSync('test.json', JSON.stringify(data), 'utf-8');
    res.redirect('/list');
});

app.listen(3000);
console.log('Server is listening on port 3000');