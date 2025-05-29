const levelRouter = require("express").Router();
const { handleError } = require("../helpers/errorHandler");
const { Level } = require("../models");

levelRouter.get("/", (req, res) => {
    Level.findAll()
        .then((levels) => {
            res.status(200).json(levels);
        })
        .catch((err) => {
            handleError(err, req, res, 'Failed to fetch levels');
        });
});

module.exports = levelRouter