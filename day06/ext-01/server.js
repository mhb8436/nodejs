const express = require('express');
const fs = require('fs');
const path = require('path');
const models = require('./models')


const app = express();

app.use(express.json());

app.get('/boards', async (req, res) => {
    const boards = await models.Board.findAll();
    console.log(`All boards : ${boards}`);
    res.json(boards);
});


app.post('/boards', async (req, res) => {
    console.log(req.body);
    await models.Board.create({
        title: req.body.title,
        content: req.body.content,
        writer: 'Tester',
        wirte_date: Date.now()
    });
    res.redirect('/boards')
});

app.put('/boards/:id', async (req, res) => {
    const id = req.params.id;
    console.log(req.body);

    await models.Board.update(
        {title: req.body.title, content: req.body.content}, 
        {where : {
            id: id
        }}
    );
    res.redirect('/boards')

});

app.get('/boards/:id', async (req, res) => {
    const id = req.params.id;
    console.log(`board detail : ${req.params.id}`);

    const detail = await models.Board.findAll({
        where : { id : id }
    });

    res.json({detail:detail});
})

app.delete('/boards', async (req, res) => {
    const id = req.params.id;

    models.Board.delete({
        where: { id : id }
    });

    res.redirect('/boards');
});

app.listen(3000, () => {
    console.log(`Server will be start..`);
    models.sequelize.sync({force:false}).then(()=> {
        console.log(`DB 연결 성공`);
    }).catch((err) => {
        console.error(`DB 연결 에러 : ${error}`);
        process.exit();
    });
});
console.log(`Server is listening on port 3000`);