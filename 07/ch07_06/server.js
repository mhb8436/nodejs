const express = require('express');
const fs = require('fs')
const sqlite3 = require('sqlite3');

const app = express();
const path = require('path');
const moment = require('moment');

const db_name = path.join(__dirname, "board.db");
const db = new sqlite3.Database(db_name)
app.set('view engine', 'ejs');
app.use(express.static('public'));

const create_sql = `
    CREATE TABLE if not exists board (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title VARCHAR(255), 
        content TEXT, 
        writer TEXT,
        write_date TEXT,
        count integer default 0
    )`;
    
db.serialize(() => {
    db.run(create_sql);
});

app.get('/', (req, res) => {
    res.render('pages/home');
});

app.get('/list', (req, res) => {
    let p = req.query.page;
    
    const page = req.query.page ? parseInt(req.query.page) : 1    
    const limit = 5;
    const offset = (page - 1) * limit;

    let sql = `select id, title, content, writer, write_date 
        from board ORDER BY write_date DESC LIMIT ? OFFSET ? `; 

    db.all(sql, [limit, offset], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }else {
            db.get(`SELECT COUNT(*) as count FROM board`, (err, row) => {
                if(err) {
                    console.error(err);
                    res.status(500).send("Internal Server Error");                    
                }else{
                    const total = row.count;
                    const totalPages = Math.ceil(total / limit);
                    res.render('pages/list', { items: rows, currentPage: page, totalPages });
                }
            });
        }
       
    });
});


app.get('/detail/:id', (req, res) => {
    const id = req.params.id;

    let sql = `select id, title, content, writer, write_date, count from board where id = ${id}`;
    console.log(`id => ${id}, sql => ${sql}`);
    let detail = {};
    db.run(`update board set count = count + 1 where id = ${id}`, (err)=>{});
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
});


app.get('/write', (req, res) => {    
    res.render('pages/write');
});

app.use(express.urlencoded({ extended: true }));

app.post('/write', (req, res) => {
    console.log('/write post', req.body);
    const write_date = moment().format('YYYY-MM-DD');
    let sql = `insert into board(title, content, writer, write_date) 
        values('${req.body.title}', '${req.body.content}', 'tester', '${write_date}')`
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