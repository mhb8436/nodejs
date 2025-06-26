const models = require('../models');

const createBoard = async (req, res) => {
    try{
        // 파일 정보 처리
        let attachments = [];
        if (req.file) {
            // 단일 파일
            attachments.push({
                filename: req.file.filename,
                originalname: req.file.originalname,
                path: req.file.path,
                size: req.file.size,
                mimetype: req.file.mimetype
            });
        } else if (req.files && req.files.length > 0) {
            // 여러 파일
            attachments = req.files.map(file => ({
                filename: file.filename,
                originalname: file.originalname,
                path: file.path,
                size: file.size,
                mimetype: file.mimetype
            }));
        }

        const boardData = {
            ...req.body,
            attachments: attachments
        };

        const board = await models.Board.create(boardData);
        res.status(201).json(board)
    }catch(error) {
        res.status(500).json({error: error.message});
    }
};

const getBoardById = async (req, res) => {
    try{
        const board = await models.Board.findByPk(req.params.id);
        if(board) {
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
        const boards = await models.Board.findAll();
        res.status(200).json(boards);
    }catch(error) {
        res.status(500).json({error: error.message});
    }
};

const updateBoard = async (req, res) => {
    try{
        const board = await models.Board.update(req.body, {
            where: {id: req.params.id}
        });
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
        const result = await models.Board.destroy({
            where: {id: req.params.id}
        });
        if(result) {
            res.status(200).json({message: 'Board deleted successfully'});
        }else{
            res.status(404).json({message: 'Board not found'});
        }
    }catch(error) {
        res.status(500).json({error: error.message});
    }
};

// 파일 다운로드
const downloadFile = async (req, res) => {
    try {
        const { boardId, filename } = req.params;
        
        const board = await models.Board.findByPk(boardId);
        if (!board) {
            return res.status(404).json({message: 'Board not found'});
        }

        const attachment = board.attachments.find(file => file.filename === filename);
        if (!attachment) {
            return res.status(404).json({message: 'File not found'});
        }

        res.download(attachment.path, attachment.originalname);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    createBoard,
    getBoardById,
    getAllBoards,
    updateBoard,
    deleteBoard,
    downloadFile
}