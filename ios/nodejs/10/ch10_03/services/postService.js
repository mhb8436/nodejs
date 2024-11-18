const postDao = require("../dao/postDao");
// const commentDao = require("../dao/commentDao");
// const productDao = require("../dao/productDao");

const createPost = async (data) => {
  return await postDao.createPost(data);
};

const findPostById = async (id) => {
  return await postDao.findPostById(id);
};

const findAllPost = async () => {
  return await postDao.findAllPost();
};

const updatePost = async (id, data) => {
  return await postDao.updatePost(id, data);
};

const deletePost = async (id) => {
  return await postDao.deletePost(id);
};

const addComment = async (content, author, parentId) => {
  return await postDao.addComment(content, author, parentId);
};

const getComments = async (postId) => {
  return await postDao.getComments(postId);
};

module.exports = {
  createPost,
  findPostById,
  findAllPost,
  updatePost,
  deletePost,
  addComment,
  getComments,
};
