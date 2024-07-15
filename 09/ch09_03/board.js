const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
    title: String,
    content: String,
    writer: String,
    write_date: { type: Date, default: Date.now } ,
    comments: [
        {
            comment: String,
            user: String,
            created_at: { type: Date, default: Date.now }
        }
    ]
});

const Board = mongoose.model('Board', BoardSchema);

module.exports = Board;



