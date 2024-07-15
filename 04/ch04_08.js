const express = require('express')
const fs = require('fs');
const app = express()
const port = 3000;

app.get('/list', (req,res) => {
    list(req, res)
});

const list = (req, res) => {
    const data = fs.readFileSync(
        'test.json', 'utf-8');
    const result = JSON.parse(data);
    res.json(result);   
}

app.listen(port, () => {
    console.log(`Example app 
        listening on port ${port}`);
});


