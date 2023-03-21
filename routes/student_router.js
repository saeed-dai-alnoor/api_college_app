const router = require('express').Router();
const StudentController = require('../controllers/student_controller');
const checkToken = require('../auth/token_vaildation');

router.post('/login-student', StudentController.loginStudent)
router.post('/create-student', checkToken, StudentController.createStudent);
router.get('/students', checkToken, StudentController.getStudents);
router.get('/students/:studentId', checkToken, StudentController.getStudentById);
router.put('/update-student', checkToken, StudentController.updateStudent);
router.delete('/delete-student', checkToken, StudentController.deleteStudent);
module.exports = router;