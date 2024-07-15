const express = require('express');
const boardController = require('../controllers/boardController');
const { authenticateToken } = require('../middleware/auth_middleware')

const  router = express.Router();

router.post('/', authenticateToken, boardController.createBoard);
router.get('/:id', boardController.getBoardById);
router.get('/', boardController.getAllBoards);
router.put('/:id', boardController.updateBoard);
router.delete('/:id', boardController.deleteBoard);

module.exports = router;

