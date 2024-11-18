const express = require("express");
const postController = require("../controllers/postController");
const { check } = require("express-validator");
const { authenticate } = require("../middleware/auth_middleware");
const router = express.Router();

router.get("/", authenticate, postController.findAll);
//http://localhost:3000/posts
router.post("/", authenticate, postController.createPost);
router.get("/:id", authenticate, postController.findPostById);
router.put("/:id", authenticate, postController.updatePost);
router.delete("/:id", authenticate, postController.deletePost);

module.exports = router;
