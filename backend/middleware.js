const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader.split(" ")[0] != 'Bearer') {
        return res.status(403).json({});
    }

    const token = authHeader.split(" ")[1];

    try {
        const verify = jwt.verify(token, JWT_SECRET);
        req.userId = verify.userId;
        next();
    } catch (error) {
        return res.status(403).json({ error: error.message });
    }
}

module.exports = { authMiddleware };