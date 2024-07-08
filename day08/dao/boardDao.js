const models = require('../models');

const createBoard = async (boardData) => {
    return await models.Board.create(boardData);
};

const getBoardById = async (id) => {
    return await models.Board.findByPk(id);
};

const getAllBoards = async () => {
    return await models.Board.findAll();
};

const updateBoard = async (id, boardData) => {
    return await models.Board.update(boardData, {
        where : {id}
    });
};

const deleteBoard = async (id) => {
    return await models.Board.destroy({
        where : {id}
    });
};

module.exports = {
    createBoard,
    getBoardById,
    getAllBoards,
    updateBoard,
    deleteBoard,
}