/*****************************************************
 * config/jwt.js
 *****************************************************/
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "default_secret";

module.exports = {
    SECRET_KEY,
    signToken: (payload, expiresIn = "1h") =>
        jwt.sign(payload, SECRET_KEY, { expiresIn }),
    verifyToken: (token) => jwt.verify(token, SECRET_KEY),
};
