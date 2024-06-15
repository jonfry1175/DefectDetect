const {Bug} = require("../models");

class BugController {
    static async getAll(req, res) {
        try {
            const bugs = await Bug.findAll();
            res.status(200).json(bugs);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = BugController
