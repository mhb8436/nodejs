const models = require('../models'); // ../models/index.js db => models 
// Data Access Object for User 
const findAll = async () => {
    return await models.User.findAll();
    // select * from users 
}

const createUser = async (userData) => {
    return await models.User.create(userData);
}

const findUserByEmail = async (email) => {
    return await models.User.findOne({
        where : {email: email}
    }); // select * from users where email = email
}
module.exports = {
    findAll,
    createUser,
    findUserByEmail,
}