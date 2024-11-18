const models = require("../models");
// models/index.js 의 db 객체가 models 에 할당

const createPost = async (data) => {
  // 글 쓰기
  // data.createAt = new Date();
  return await models.Post.create(data);
};

const findPostById = async (id) => {
  // 게시글 가져오기
  return await models.Post.findByPk(id, {
    include: { model: models.User },
  });
};

const findAllPost = async () => {
  // 목록 조회
  return await models.Post.findAll({
    include: {
      model: models.User,
    },
  });
};

const updatePost = async (id, data) => {
  // 게시글 수정
  return await models.Post.update(data, {
    where: { id },
  });
};

const deletePost = async (id) => {
  return await models.Post.destroy({
    where: { id },
  });
};

const addComment = async (content, author, parentId) => {
  return await Comment.create({ content, author, postId, parentId });
};

const getComments = async (postId) => {
  return await Comment.findAll({
    where: { postId, parentId: null },
    include: [{ model: Comment, as: "Replies" }],
  });
};

module.exports = {
  createPost,
  findAllPost,
  findPostById,
  updatePost,
  deletePost,
  addComment,
  getComments,
};
