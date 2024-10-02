var express = require('express');
var fs = require('fs');
var moment = require('moment');

var app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('pages/home');
});


app.get('/list', (req, res) => {
    const result = fs.readFileSync('test.json', 'utf-8');
    const data = JSON.parse(result);    
    
    res.render('pages/list', {items: data['result']});
});


app.get('/detail/:id', (req, res) => {
    const id = req.params.id;

    const result = fs.readFileSync('test.json', 'utf-8');
    let data = JSON.parse(result); 
    let detail = {};

    data['result'].forEach((item) => {
        if(item['id'] == id) {
            detail = item;
            item.count = item.count + 1;
        }
    });
    
    fs.writeFileSync('test.json', JSON.stringify(data), 'utf-8');

    // const detail = data['result'].filter((item) => {
    //     return item['id'] == id;
    // })[0];
    
    res.render('pages/detail', {detail: detail});
});


app.get('/write', (req, res) => {    
    res.render('pages/write');
});

app.use(express.urlencoded({ extended: true }));

let maxId = 0
const initId = () => {
    const result = fs.readFileSync('test.json', 'utf-8');
    let data = JSON.parse(result);
    const arr = data['result'].map(x=>parseInt(x.id));
    // console.log(arr.sort());
    // console.log(Math.max(...arr))
    maxId = Math.max(...arr);
}

const getId = () => {
    return ++maxId;
}

initId();

console.log(`getId() => ${getId()}`);
console.log(`getId() => ${getId()}`);
app.post('/write', (req, res) => {
    console.log('/write post', req.body);
    // save data to file
    const result = fs.readFileSync('test.json', 'utf-8');
    let data = JSON.parse(result);
    
    const last = data['result'].slice(-1);
    const last_id = last[0]['id'] + 1;
    const write_date = moment().format('YYYY-MM-DD');
    
    data['result'].push({
        'id': last_id, 'title': req.body.title, 'content': req.body.content, 'writer':'tester' , 'write_date': write_date
    });

    fs.writeFileSync('test.json', JSON.stringify(data), 'utf-8');
    res.redirect('/list')
});


app.get('/update/:id', (req, res) => {
    const id = req.params.id;

    const result = fs.readFileSync('test.json', 'utf-8');
    const data = JSON.parse(result); 
    let detail = {};

    data['result'].forEach((item) => {
        if(item['id'] == id) {
            detail = item;
        }
    });

    res.render('pages/update', {detail: detail});
});

app.post('/update/:id', (req, res) => {
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

app.get('/delete/:id', (req, res) => {
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