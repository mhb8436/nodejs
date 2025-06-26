const bcrypt = require('bcryptjs');
const models = require('../models');
const { generateAccessToken, generateRefreshToken } = require('../utils/token');

const register = async (req, res) => {
    const {email, name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try{
        const user = await models.User.create({
            email: email, name: name, password: hashedPassword,
        });
        res.status(201).json(user)
    }catch(error) {
        res.status(500).json({error: error.message});
    }
};

const login = async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await models.User.findOne({
            where: {email: email}
        });
        if(!user) {
            return res.status(400).json({
                message: 'Invalid email and password'
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                message: 'Invalid email and password'
            });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.json({
            accessToken, refreshToken
        })
    }catch(error) {
        res.status(500).json({error: error.message});
    }
};

const refresh = (req, res) => {
    const { token } = req.body;
    if(!token) return res.sendStatus(401);

    jwt.verify(token, 'refresh_secret', (err,user) => {
        if (err) return res.sendStatus(403);

        const accessToken = generateAccessToken(user);
        res.json({
            accessToken,
        })
    });
}

module.exports = {
    register,
    login,
    refresh,
}
