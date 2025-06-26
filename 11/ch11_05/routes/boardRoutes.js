const express = require('express');
const boardController = require('../controllers/boardController');
const { authenticateToken } = require('../middleware/auth_middleware');
const { uploadSingle, uploadMultiple } = require('../middleware/upload');

const router = express.Router();

// 게시글 작성 (단일 파일 업로드)
router.post('/', authenticateToken, uploadSingle, boardController.createBoard);

// 게시글 작성 (여러 파일 업로드)
router.post('/multiple', authenticateToken, uploadMultiple, boardController.createBoard);

// 게시글 조회
router.get('/:id', boardController.getBoardById);
router.get('/', boardController.getAllBoards);

// 게시글 수정
router.put('/:id', authenticateToken, boardController.updateBoard);

// 게시글 삭제
router.delete('/:id', authenticateToken, boardController.deleteBoard);

// 파일 다운로드
router.get('/:boardId/files/:filename', boardController.downloadFile);

module.exports = router;

