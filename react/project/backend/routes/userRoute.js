const express = require('express');
const userController = require('../controllers/userController');
const {check } = require('express-validator')

const router = express.Router();

router.get('/', userController.findAll); // app.get("/users", (req, res)=>{})
router.post('/', [
    check('name').notEmpty().withMessage("Name is required"),
    check('email').notEmpty().withMessage("Email is required")
    .isEmail().withMessage("invalid email format")
], userController.createUser); // app.post("/users, (req, res) =>{}")

module.exports = router;
