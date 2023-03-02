const LevelController = require('../models');

//** CRUD Operation For Admin**//
//** (C) Create Operation
// Create new level
const createLevel = async (req, res) => {
    const body = req.body;
    await LevelController.Level.create({
        levelId: body.levelId,
        levelName: body.levelName,
    })
        .then((level) => {
            res.send({
                success: 1,
                message: 'Create level successfuly done!',
                data: level
            });
        })
        .catch((error) => {
            res.send({
                success: 0,
                message: error.errors[0].message
            });
        });
}
// ** (R) Read Operation
// Read level by id
const getLevelById = async (req, res) => {
    await LevelController.Level.findByPk(req.params.levelId)
        .then((level) => {
            if (!level || isNaN(req.params.levelId)) {
                res.send({
                    success: 0,
                    message: 'Level is not found!'
                });
            } else {
                res.send({
                    success: 1,
                    message: 'Get level successfuly done!',
                    data: level
                });
            }
        })
        .catch((error) => {
            res.send({
                success: 0,
                message: error.message
            });
        });
}
// Read all levels
const getLevels = async (_req, res) => {
    await LevelController.Level.findAll()
        .then((levels) => {
            res.send({
                success: 1,
                message: 'Get level successfuly done!',
                data: levels.length == 0? 'This table is empty!': levels
            });
        })
        .catch((error) => {
            res.send({
                success: 0,
                message: error.message
            });
        });
}
// ** (U) Update Operation
const updateLevel = async (req, res) => {
    const body = req.body;
    await LevelController.Level.update({
        levelName: body.levelName

    }, { where: { levelId: body.levelId } })
        .then((level) => {
            if (!level || isNaN(body.levelId)) {
                res.send({
                    success: 0,
                    message: 'Level is not found!',
                });
            } else {
                res.send({
                    success: 1,
                    message: 'update level successfuly done!',
                });
            }
        })
        .catch((error) => {
            res.send({
                success: 0,
                message: error.errors[0].message
            });
        });
}
// ** (D) Delete Operation
const deleteLevel = async (req, res) => {
    const body = req.body;
    await LevelController.Level.destroy({
        where: {
            levelId: body.levelId
        }
    })
        .then((level) => {
            if (!level || isNaN(body.levelId)) {
                res.send({
                    success: 0,
                    message: 'Level is not found!',
                });
            } else {
                res.send({
                    success: 1,
                    message: 'delete level successfuly done!',
                });
            }
        })
        .catch((error) => {
            res.send({
                success: 0,
                message: error.message
            });
        });
}

module.exports = {
    createLevel,
    getLevels,
    getLevelById,
    updateLevel,
    deleteLevel
};