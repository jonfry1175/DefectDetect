const { User } = require('../models');

class UserController {
    static async getAll(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = UserController