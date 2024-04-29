var express = require('express');
var fs = require('fs')

var app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const result = fs.readFileSync('test.json', 'utf-8');
    const data = JSON.parse(result);    
    
    res.render('pages/index', {items: data['result']});
});
app.listen(3000);
console.log('Server is listening on port 3000');