const JWT = require("jsonwebtoken");
require('dotenv').config();

const jwtAuth = (req, res, next) => {
    const token = (req.cookies && req.cookies.token) || null;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized"
        });
    }

    try {
        const payload = JWT.verify(token, process.env.SECRET);
        req.user = {
            id: payload.id,
            email: payload.email
        };
    } catch (err) { // Corrected variable name to "err"
        return res.status(401).json({
            success: false,
            message: err.message
        });
    }

    next();
}

module.exports = jwtAuth;
