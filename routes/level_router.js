const router = require('express').Router();
const LevelRouter = require('../controllers/level_controller');
const checkToken = require('../auth/token_vaildation');

router.post('/create-level', LevelRouter.createLevel);
router.get('/levels', LevelRouter.getLevels);
router.get('/levels/:levelId', LevelRouter.getLevelById);
router.put('/update-level', LevelRouter.updateLevel);
router.delete('/delete-level', LevelRouter.deleteLevel);
module.exports = router;