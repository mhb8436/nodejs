var express = require('express');
var fs = require('fs')
const db_name = path.join(__dirname, "board.db");


var app = express();
const path = require('path');


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('pages/home');
});


app.get('/list', (req, res) => {
    // const result = fs.readFileSync('test.json', 'utf-8'); // 3. comment 
    // const data = JSON.parse(result);  // 3. comment
    // res.render('pages/list', {items: data['result']}); // 3. comment 
    // 4. get data from sqlite3

    let sql = `select id, title, content, writer, write_date from board`; // 5. write select query 

    db.all(sql, [], (err, rows) => { // 6. run query
        if (err) {
            console.error(err.message);
        }
        // console.log(rows);
        rows.forEach((row) => {
            // console.log(row); // 7. test print
        });
        res.render('pages/list', {items: rows}); // 8. render page with data
    });
    console.log('end');
});


app.get('/detail/:id', (req, res) => {
    const id = req.params.id;

    let sql = `select id, title, content, writer, write_date from board where id = ${id}`;
    console.log(sql);
    let detail = {};
    db.all(sql, [], (err, rows) => { // 6. run query
        if (err) {
            console.error(err.message);
        }        
        // console.log(rows);
        rows.forEach((row) => {
            detail = row;
        });
        console.log(detail);
        res.render('pages/detail', {detail: detail}); // 8. render page with data
    });
    console.log('end');
});


app.get('/write', (req, res) => {    
    res.render('pages/write');
});

app.use(express.urlencoded({ extended: true }));

app.post('/write', (req, res) => {
    console.log('/write post', req.body);

    let sql = `insert into board(title, content, writer, write_date) values('${req.body.title}', '${req.body.content}', 'tester', '2024-06-01')`
    db.run(sql, (err) => {
        if(err) {
            console.error(err);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`)
        res.redirect('/list');
    });

});


app.get('/update/:id', (req, res) => {
    const id = req.params.id;

    let sql = `select id, title, content, writer, write_date from board where id = ${id}`;
    console.log(sql);
    db.all(sql, [], (err, rows) => { // 6. run query
        if (err) {
            console.error(err.message);
        }        
        let detail = {};
        rows.forEach((row) => {
            detail = row;
        });
        res.render('pages/update', {detail: detail}); // 8. render page with data
    });
    console.log('end');    
});

app.post('/update/:id', (req, res) => {
    const id = req.params.id;

    let sql = `update board set title = '${req.body.title}', content = '${req.body.content}' where id = ${id}`
    db.run(sql, (err) => {
        if(err) {
            console.error(err);
        }
        console.log(`A row has been updated with rowid ${this.lastID}`)
        res.redirect('/list');
    });

});

app.get('/delete/:id', (req, res) => {
    const id = req.params.id;

    let sql = `delete from board where id = ${id}`
    db.run(sql, (err) => {
        if(err) {
            console.error(err);
        }
        console.log(`A row has been deleted with rowid ${this.lastID}`)
        res.redirect('/list');
    });

});

app.listen(3000);
console.log('Server is listening on port 3000');