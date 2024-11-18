const userService = require('../services/userService');
const {validationResult} = require('express-validator'); // added

const createUser = async (req, res) => {
    try{
        const errors = validationResult(req); // added 
        if(!errors.isEmpty()){ // added
            return res.status(400).json({errors: errors.array().map(e=>e.msg)});
        } // added
        const user = await userService.createUser(req.body);
        res.status(201).json({data:user, message:'ok'});
    }catch(e){
        res.status(500).json({message: e.message});
    }
}

const findAll = async (req, res) => {
    try{
        const users = await userService.findAll();
        // const users = await models.User.findAll();
        res.status(200).json({data: users, message:'ok'});
    }catch(e){
        res.status(500).json({message: e});
    }
}


module.exports = {
    findAll,
    createUser,
}