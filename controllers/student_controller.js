const StudentController = require('../models');
const bcrypt = require('bcrypt');

// ** Login student
const loginStudent = async (req, res) => {
    const body = req.body;
    await StudentController.Student.findOne({
        where: { phone: body.phone }
    })
        .then(async (student) => {
            if (!student || isNaN(body.phone)) {
                res.send({
                    success: 0,
                    message: 'Invaild Id or phone'
                });
            }
            else {
                const match = await bcrypt.compare(body.password, student.password);
                if (match) {

                    res.send({
                        success: 1,
                        message: 'login successfuly done!',
                        name: student.studentName,
                    });
                } else {
                    res.send({
                        success: 0,
                        message: 'Invaild Id or phone'
                    });
                }
            }
        })
        .catch((error) => {
            res.send({
                success: 0,
                message: error.message
            });
        });
}
//** CRUD Operation For Admin**//
//** (C) Create Operation
// Create new student
const createStudent = async (req, res) => {
    const body = req.body;
    await StudentController.Student.create({
        studentId: body.studentId,
        studentName: body.studentName,
        phone: body.phone,
        levelId: body.levelId
    })
        .then((student) => {
            res.send({
                success: 1,
                message: 'Create student successfuly done!',
                data: student
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
// Read student by id 
const getStudentById = async (req, res) => {
    await StudentController.Student.findByPk(req.params.studentId)
        .then((student) => {
            if (!student || isNaN(req.params.studentId)) {
                res.send({
                    success: 0,
                    message: 'Student is not found!'
                });
            } else {
                res.send({
                    success: 1,
                    message: 'Get student successfuly done!',
                    data: student
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
// Read all students
const getStudents = async (_req, res) => {
    await StudentController.Student.findAll()
        .then((students) => {
            res.send({
                success: 1,
                message: 'Get students successfuly done!',
                data: students
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
const updateStudent = async (req, res) => {
    const body = req.body;
    await StudentController.Student.update({
        studentId: body.studentId,
        studentName: body.studentName,
        phone: body.phone,
        levelId: body.levelId
    }, { where: { studentId: body.student } })
        .then((student) => {
            if (!student || isNaN(body.studentId)) {
                res.send({
                    success: 0,
                    message: 'Student is not found!',
                });
            } else {
                res.send({
                    success: 1,
                    message: 'update student successfuly done!',
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
const deleteStudent = async (req, res) => {
    const body = req.body;
    await StudentController.Student.destroy({
        where: {
            studentId: body.studentId
        }
    })
        .then((student) => {
            if (!student || isNaN(body.studentId)) {
                res.send({
                    success: 0,
                    message: 'Student is not found!',
                });
            } else {
                res.send({
                    success: 1,
                    message: 'delete student successfuly done!',
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
    loginStudent,
    createStudent,
    getStudentById,
    getStudents,
    updateStudent,
    deleteStudent
}