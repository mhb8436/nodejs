var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/sample', (req, res) => {
    var data = [
        {title: 'This is Title1', content: 'This is Content1'},
        {title: 'This is Title2', content: 'This is Content2'},
        {title: 'This is Title3', content: 'This is Content3'},
    ];
    res.render('pages/sample', {data: data});
});

app.get('/', (req, res) => {
    res.render('pages/index');
});



app.listen(3000);
console.log('Server is listening on port 3000');