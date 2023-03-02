const router = require('express').Router();
const LevelRouter = require('../controllers/level_controller');
const checkToken = require('../auth/token_vaildation');

router.post('/create-level', checkToken, LevelRouter.createLevel);
router.get('/levels', LevelRouter.getLevels);
router.get('/levels/:levelId', checkToken, LevelRouter.getLevelById);
router.put('/update-level', checkToken, LevelRouter.updateLevel);
router.delete('/delete-level', checkToken, LevelRouter.deleteLevel);
module.exports = router;