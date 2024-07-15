const models = require('../models');

const createUser = async (userData) => {
    return await models.User.create(userData)
};

const getUserById = async (id) => {
    return await models.User.findByPk(id);
};

const getAllUsers = async () => {
    return await models.User.findAll();
};

const updateUser = async (id, userData) => {
    return await models.User.update(userData, {
        where : {id},
    });
};

const deleteUser = async (id) => {
    return await models.User.destory({
        where : { id }
    });
};

const getUserByEmail = async (email) => {
    return await models.User.findOne({
        where: {email:email}
    })
};

module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
    getUserByEmail,
};