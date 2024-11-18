const userDao = require('../dao/userDao');

const findAll = async () => {
    // complex biz logic 
    return await userDao.findAll();
}

const createUser = async (userData) => {
    return await userDao.createUser(userData);
}

const findUserByEmail = async (email) => {
    return await userDao.findUserByEmail(email);
}
module.exports = {
    findAll,
    createUser,
    findUserByEmail,
}