const { User, Bug } = require('../models');

class UserController {
    static async getAll(req, res) {
        try {
            const users = await User.findAll({
                include: [Bug]
            });
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = UserController