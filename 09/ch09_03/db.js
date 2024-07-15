const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/facebook');

const db = mongoose.connection;

db.on('error', (err) => {
    console.error(`db connect error : ${err}`);
});

db.once('open', () => {
    console.log(`Database connected successfully `)
});


