const { Bug, User, Level } = require("../models");

class BugController {
    static async getAll(req, res) {
        try {
            const bugs = await Bug.findAll({
                include: [
                    { model: User },
                    { model: Level, as: 'SeverityLevel' },
                    { model: Level, as: 'PriorityLevel' }
                ]
            });
            res.status(200).json(bugs);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    static async create(req, res) {
        try {
            const { title, build_version, expected_result, actual_result, image, user_id, severity_level_id, priority_level_id } = req.body;
            const newBug = await Bug.create({
                title,
                build_version,
                expected_result,
                actual_result,
                image,
                user_id,
                severity_level_id,
                priority_level_id
            });
            res.status(201).json(newBug);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    static async updateStatus(req, res) {}
}

module.exports = BugController
