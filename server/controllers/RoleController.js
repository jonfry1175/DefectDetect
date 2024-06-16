const { Role, User } = require("../models");

class RoleController {
    static async getAll(req, res) {
        try {
            const roles = await Role.findAll({
                include: [User]
            });
            res.status(200).json(roles);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = RoleController