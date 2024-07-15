const boardDao = require('../dao/boardDao');

const createBoard = async (boardData) => {
    return await boardDao.createBoard(boardData);
};

const getBoardById = async (id) => {
    return await boardDao.getBoardById(id);
};

const getAllBoards = async () => {
    return await boardDao.getAllBoards();
};

const updateBoard = async (id, boardData) => {
    return await boardDao.updateBoard(id, boardData);
};

const deleteBoard = async (id) => {
    return await boardDao.deleteBoard(id);
}

module.exports = {
    createBoard,
    getBoardById,
    getAllBoards,
    updateBoard,
    deleteBoard,
}