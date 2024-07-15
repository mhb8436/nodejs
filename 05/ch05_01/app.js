const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index', 
        {title: "Express Title", 
            message:'Hello Pug'});
});

app.listen(PORT, () => {
    console.log(`Server is running`);
});


