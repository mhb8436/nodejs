const express = require('express');
const Board = require('./board');

const router = express.Router();

router.post('/boards', async (req, res) => {
    const {title, content, writer} = req.body;

    try{
        const board = new Board({
            title: title,
            content: content,
            writer: writer,
        });
        board.save();
        res.status(200).json(board);
    }catch(error) {
        console.error(`post error : ${error}`);
        res.status(200).json({error: error})
    }
});

router.get('/boards', async (req, res) => {
    try{
        const boards = await Board.find({});
        res.json(boards);
    }catch(error) {
        console.error(`get error : ${error}`);
        res.status(200).json({error: error})
    }
});

router.get('/boards/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const boards = await Board.findById(id)
        res.json(boards);
    }catch(error) {
        console.error(`get error : ${error}`);
        res.status(200).json({error: error})
    }
});

router.put('/boards/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try{
        const board = await Board.findByIdAndUpdate(id, {
            title, content
        }, {new: true});
        res.status(200).json(board);

    }catch(error) {
        console.error(`put error : ${error}`);
        res.status(200).json({error: error});
    }
});


router.delete('/boards/:id', async (req, res) => {
    const { id } = req.params;    

    try{
        const board = await Board.findByIdAndDelete(id);
        res.status(200).json(board);
    }catch(error) {
        console.error(`put error : ${error}`);
        res.status(200).json({error: error});
    }
});

router.post('/boards/:id/comments', async (req, res) => {
    const { id } = req.params;
    const { comment, user } = req.body;
    try{
        const board = await Board.updateOne({
            _id: id
        }, {
            $push: {comments: {comment: comment, user: user}}
        });
        console.log(`put comments : ${id}, ${cid}, ${comment}, ${user}, ${JSON.stringify(board)}`)
        res.redirect('/boards');
    }catch(error) {
        console.error(`comments post error : ${error}`);
        res.status(200).json({error: error});
    }
});

router.put('/boards/:id/comments/:cid', async (req, res) => {
    const { id, cid } = req.params;
    const { comment, user } = req.body;
    try{
        const board = await Board.updateOne({
            _id: id, 'comments._id':cid
        }, {
            $set : {
                'comments.$' : {
                    'comment': comment,
                    'user': user,
                }
            }
        });
        console.log(`put comments : ${id}, ${cid}, ${comment}, ${user}, ${JSON.stringify(board)}`)
        res.redirect('/boards');
    }catch(error) {
        console.error(`comments post error : ${error}`);
        res.status(200).json({error: error});
    }
});

router.delete('/boards/:id/comments/:cid', async (req, res) => {
    const { id, cid } = req.params;    
    try{
        const board = await Board.updateOne({
            _id:id,
        }, {
            $pull : {
                comments: {_id: cid}
            }
        });
        console.log(`put comments : ${id}, ${cid}, ${JSON.stringify(board)}`)
        res.redirect('/boards');
    }catch(error) {
        console.error(`comments post error : ${error}`);
        res.status(200).json({error: error});
    }
});



module.exports = router;