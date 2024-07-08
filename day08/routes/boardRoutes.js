const express = require('express');
const boardController = require('../controllers/boardController');

const  router = express.Router();

router.post('/', boardController.createBoard);
router.get('/:id', boardController.getBoardById);
router.get('/', boardController.getAllBoards);
router.put('/:id', boardController.updateBoard);
router.delete('/:id', boardController.deleteBoard);

module.exports = router;