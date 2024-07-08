const userDao = require('../dao/userDao');

const createUser = async (userData) => {
    return await userDao.createUser(userData);
};

const getUserById = async (id) => {
    return await userDao.getUserById(id);
};

const getAllUsers = async () => {
    return await userDao.getAllUsers();
};

const updateUser = async (id, userData) => {
    return await userDao.updateUser(id, userData);
};

const deleteUser = async (id) => {
    return await userDao.deleteUser(id);
}

const getUserByEmail = async (email) => {
    return await userDao.getUserByEmail(email);
}

module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
    getUserByEmail,
}