const { Bug, User, Level } = require("../models");
const { handleError } = require("../helpers/errorHandler");

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
            handleError(err, req, res, 'Failed to fetch bugs');
        }
    }

    static async create(req, res) {
        try {
            const { title, build_version, expected_result, actual_result, image, severity_level_id, priority_level_id, is_solved } = req.body;
            const user_id = req.user.id;
            const newBug = await Bug.create({
                title,
                build_version,
                expected_result,
                actual_result,
                image,
                user_id,
                severity_level_id,
                priority_level_id,
                is_solved: is_solved || false
            });
            res.status(201).json(newBug);
        } catch (err) {
            handleError(err, req, res, 'Failed to create bug');
        }
    }

    static async changeIsSolved(req, res) {
        try {
            const id = +req.params.id;
           const foundId = await Bug.findByPk(id);
    
           if (!foundId) {
               return res.status(404).json({ message: 'Bug not found' });
           }
           // check if bug is already solved
           if (foundId.is_solved === true) {
               return res.status(400).json({ message: 'Bug is already solved' });
           }
            const bug = await Bug.update({ is_solved: true }, { where: { id } });
            res.status(200).json({message: 'Bug solved successfully'});
        } catch (err) {
            handleError(err, req, res, 'Failed to update bug status');
        }
    }

    static async getBugById(req, res) {
        try {
            const id = +req.params.id;
            const foundId = await Bug.findByPk(id, {
                include: [
                    { model: User },
                    { model: Level, as: 'SeverityLevel' },
                    { model: Level, as: 'PriorityLevel' }
                ]
            });
            if (!foundId) {
                return res.status(404).json({ message: 'Bug not found' });
            }
            res.status(200).json(foundId);
        } catch (err) {
            handleError(err, req, res, 'Failed to fetch bug by ID');
        }
    }
}
module.exports = BugController
