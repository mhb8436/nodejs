const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    // chagned
    console.log("authenticate", req.headers.authorization);
    token = req.headers.authorization.split(" ")[1]; // chagned
    // Bearer xxxxxxx
  }
  if (!token) return res.sendStatus(401);
  jwt.verify(token, "access", (err, user) => {
    if (err) return res.sendStatus(401);
    req.user = user; // id, email
    next();
  });
};

module.exports = {
  authenticate,
};
