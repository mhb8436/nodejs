const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.post("/", postController.createPost); // POST /posts
router.get("/", postController.findAllPost); // GET /posts
router.get("/:id", postController.findPostById); // GET /posts/1
router.put("/:id", postController.updatePost); // PUT /posts/1
router.delete("/:id", postController.deletePost); // DELETE /posts/1

module.exports = router;
