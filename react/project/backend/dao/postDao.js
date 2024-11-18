const models = require('../models');

const createPost = async (data) => {
    return await models.Post.create(data);
}
const findPostById = async (id) => {
    return await models.Post.findByPk(id, {
        include: {model: models.User}
    });
}
const findAll = async () => {
    return await models.Post.findAll({
        include: {
            model: models.User
        }
    })
};
const updatePost = async (id, data) =>{
    return await models.Post.update(data, {
        where : {id}
    });
}
const deletePost = async (id) => {
    return await models.Post.destroy({
        where : {id},
    })
}
module.exports = {
    createPost,
    findPostById,
    findAll,
    updatePost,
    deletePost,
}