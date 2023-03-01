const router = require('express').Router();
const TeacherRouter = require('../controllers/teacher_controller');
const checkToken = require('../auth/token_vaildation');

router.post('/teacher-login', TeacherRouter.teacherLogin)
router.post('/create-teacher', checkToken, TeacherRouter.createTeachers);
router.get('/teachers', checkToken, TeacherRouter.getTeachers);
router.get('/teachers/:teacherId', checkToken, TeacherRouter.getTeacherById);
router.put('/update-teacher', checkToken, TeacherRouter.updateTeacher);
router.delete('/delete-teacher', checkToken, TeacherRouter.deleteTeacher);
module.exports = router;