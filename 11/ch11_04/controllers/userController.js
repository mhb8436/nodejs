const userService = require('../services/userService');

const createUser = async(req, res) => {
    try{
        const user = await userService.createUser(req.body);
        res.status(201).json(user)
    }catch(error) {
        res.status(500).json({error: error.message});
    }
};

const getUserById = async (req, res) => {
    try{
        const user = await userService.getUserById(req.params.id);
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
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    }catch(error) {
        res.status(500).json({error: error.message});
    }
};

const updateUser = async (req, res) => {
    try{
        const user = await userService.updateUser(req.params.id, req.body);
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
        const result = await userService.deleteUser(req.params.id);
        if(result) {
            res.status(200).json({message: 'User deleted successfully'});
        }else{
            res.status(404).json({message: 'User not found'});
        }
    }catch(error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
}