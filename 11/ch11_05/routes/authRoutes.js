const express = require('express');
const {register, login, refresh} = require('../controllers/authController');
const { validateLogin, validateRegister } = require('../middleware/validation_middleware');

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/refresh', refresh);

module.exports = router;

