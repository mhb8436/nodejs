const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "Hello World"
 *         content:
 *           type: string
 *           example: "Welcome to the board!"
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: "게시글 작성"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Post"
 *     responses:
 *       201:
 *         description: "게시글이 작성되었습니다."
 */
router.post("/", postController.createPost); // POST /posts

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: "게시글 목록 조회"
 *     responses:
 *       200:
 *         description: "게시글 목록"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Post"
 */
router.get("/", postController.findAllPost); // GET /posts

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: "게시글 상세 조회"
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: "게시글 상세 정보"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Post"
 */
router.get("/:id", postController.findPostById); // GET /posts/1

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: "게시글 수정"
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Post"
 *     responses:
 *       200:
 *         description: "게시글이 수정되었습니다."
 */
router.put("/:id", postController.updatePost); // PUT /posts/1

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: "게시글 삭제"
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: "게시글이 삭제되었습니다."
 */
router.delete("/:id", postController.deletePost); // DELETE /posts/1

module.exports = router;
