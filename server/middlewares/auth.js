const { tokenValidator } = require('../helpers/jsonwebtoken')


const authMiddleware = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        console.log(token)
        if (!token) {
            return res.status(401).json({ message: "Token not found" });
        }
        tokenValidator(token);
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}

module.exports = authMiddleware