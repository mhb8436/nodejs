const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    return jwt.sign({
        id: user.id, 
        email: user.email,
    }, 'access_secret', {expiresIn: '15m'});
};

const generateRefreshToken = (user) => {
    return jwt.sign({
        id: user.id, 
        email: user.email,
    }, 'refresh_secret', {expiresIn: '14d'});
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
}

