const postService = require("../services/postService");
// const postDao = require('../dao/postDao'); // 금지
// const models = require('../models'); // 금지

const createPost = async (req, res) => {
  try {
    // {"title":"a","content":"b", "userId": 2} = req.body
    const post = await postService.createPost(req.body);
    res.status(201).json({ data: post });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const findPostById = async (req, res) => {
  try {
    const post = await postService.findPostById(req.params.id);
    if (post) {
      res.status(200).json({ data: post });
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const findAllPost = async (req, res) => {
  // 게시글 목록 전체 반환
  try {
    const posts = await postService.findAllPost();
    res.status(200).json({ data: posts });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const updatePost = async (req, res) => {
  // 게시글 수정
  try {
    // {"title":"aa", "content":"bbb", "userId": 2} // http://localhost:3000/posts/1
    const post = await postService.updatePost(req.params.id, req.body);
    if (post) {
      // 1 or 0
      res.status(200).json({ data: "success" });
    } else {
      res.status(404).json({ data: "post not found" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const result = await postService.deletePost(req.params.id);
    if (result) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(404).json({ message: "not found post" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { content, author, parentId } = req.body;
    const result = await postService.addComment(content, author, parentId);
    if (result) {
      res.status(200).json({ data: result, message: "success" });
    } else {
      res.status(404).json({ message: "not found post" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const result = await postService.getComments(postId);
    if (result) {
      res.status(200).json({ data: result, message: "success" });
    } else {
      res.status(404).json({ message: "not found post" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  createPost,
  findPostById,
  findAllPost,
  updatePost,
  deletePost,
};
