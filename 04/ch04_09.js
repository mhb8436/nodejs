const express = require('express')
const fs = require('fs');
const app = express()
const port = 3000;

app.get('/home', (req,res) => {
    home(req, res)
});

const home = (req, res) => {
    res.send(`<h1>Welcome</h1>
        <h1>Home</h1>`)
}

app.listen(port, () => {
    console.log(`Example app 
        listening on port ${port}`);
});


