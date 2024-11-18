const bcrypt = require("bcryptjs");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");
const userService = require("../services/userService");

// sign up
const register = async (req, res) => {
  const { email, name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await userService.createUser({
      email: email,
      name: name,
      password: hashedPassword,
    });
    res.status(201).json({ message: "ok", data: user });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({
        message: `Invalid email and password : ${user} ${email} ${password}`,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: `Invalid email and password : ${user} ${email} ${password}`,
      });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.status(200).json({
      user,
      accessToken,
      refreshToken,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const jwt = require("jsonwebtoken");
const refresh = async (req, res) => {
  const { token } = req.body; // refresh token
  if (!token) return res.sendStatus(401);

  jwt.verify(token, "refresh", (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken(user);
    res.status(200).json({
      accessToken,
    });
  });
};

const validate = async (req, res) => {
  const { token } = req.body; // refresh token
  if (!token) return res.sendStatus(401);
  try {
    const user = jwt.verify(token, "access");
    res.json({ valid: true, user });
  } catch (e) {
    res.json({ valid: false });
  }
};

module.exports = {
  register,
  login,
  refresh,
  validate,
};
