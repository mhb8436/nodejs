const postDao = require('../dao/postDao');

const createPost = async (data) => {
    return await postDao.createPost(data);
}
const findPostById = async (id) => {
    return await postDao.findPostById(id);
}
const findAll = async () => {
    return await postDao.findAll();
}
const updatePost = async (id, data) => {
    return await postDao.updatePost(id, data);
}
const deletePost = async (id) => {
    return await postDao.deletePost(id);
}
module.exports = {
    createPost,
    findPostById,
    findAll,
    updatePost,
    deletePost,
}