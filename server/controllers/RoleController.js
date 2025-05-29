const { Role, User } = require("../models");
const { handleError } = require("../helpers/errorHandler");

class RoleController {
    static async getAll(req, res) {
        try {
            const roles = await Role.findAll({
                include: [User]
            });
            res.status(200).json(roles);
        } catch (err) {
            handleError(err, req, res, 'Failed to fetch roles');
        }
    }
}

module.exports = RoleController