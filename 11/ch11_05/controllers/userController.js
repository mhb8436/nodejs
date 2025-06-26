const models = require('../models');

const createUser = async(req, res) => {
    try{
        const user = await models.User.create(req.body);
        res.status(201).json(user)
    }catch(error) {
        res.status(500).json({error: error.message});
    }
};

const getUserById = async (req, res) => {
    try{
        const user = await models.User.findByPk(req.params.id);
        if(user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({message: 'User not found'});
        }
    }catch(error) {
        res.status(500).json({error: error.message});
    }
};

const getAllUsers = async (req, res) => {
    try{
        const users = await models.User.findAll();
        res.status(200).json(users);
    }catch(error) {
        res.status(500).json({error: error.message});
    }
};

const updateUser = async (req, res) => {
    try{
        const user = await models.User.update(req.body, {
            where: {id: req.params.id}
        });
        if(user[0]) {
            res.status(200).json({message: 'User updated successfully'});
        }else {
            res.status(404).json({message: 'User not found'});
        }
    }catch(error) {
        res.status(500).json({error: error.message});
    }
};

const deleteUser = async (req, res) => {
    try{
        const result = await models.User.destroy({
            where: {id: req.params.id}
        });
        if(result) {
            res.status(200).json({message: 'User deleted successfully'});
        }else{
            res.status(404).json({message: 'User not found'});
        }
    }catch(error) {
        res.status(500).json({error: error.message});
    }
};

const getUserByEmail = async (email) => {
    return await models.User.findOne({
        where: {email: email}
    });
};

module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
    getUserByEmail,
}