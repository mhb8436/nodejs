const boardService = require('../services/boardService');

const createBoard = async (req, res) => {
    try{
        const board = await boardService.createBoard(req.body);
        res.status(201).json(board)
    }catch(error) {
        res.status(500).json({error: error.message});
    }
};

const getBoardById = async (req, res) => {
    try{
        const board = await boardService.getBoardById(req.params.id);
        if(user) {
            res.status(200).json(board)
        } else {
            res.status(404).json({message: 'Board not found'});
        }
    }catch(error) {
        res.status(500).json({error: error.message});
    }
};

const getAllBoards = async (req, res) => {
    try{
        const boards = await boardService.getAllBoards();
        res.status(200).json(boards);
    }catch(error) {
        res.status(500).json({error: error.message});
    }
};

const updateBoard = async (req, res) => {
    try{
        const board = await boardService.updateBoard(req.params.id, req.body);
        if(board[0]) {
            res.status(200).json({message: 'Board updated successfully'});
        }else {
            res.status(404).json({message: 'Board not found'});
        }
    }catch(error) {
        res.status(500).json({error: error.message});
    }
};

const deleteBoard = async (req, res) => {
    try{
        const result = await boardService.deleteBoard(req.params.id);
        if(result) {
            res.status(200).json({message: 'Board deleted successfully'});
        }else{
            res.status(404).json({message: 'Board not found'});
        }
    }catch(error) {
        res.status(500).json({error: error.message});
    }
};


module.exports = {
    createBoard,
    getBoardById,
    getAllBoards,
    updateBoard,
    deleteBoard,
}