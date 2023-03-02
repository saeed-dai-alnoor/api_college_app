const TeacherController = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// ** Login teacher
const loginTeacher = async (req, res) => {
    const body = req.body;
    await TeacherController.Teacher.findOne({
        where: { phone: body.phone }
    })
        .then(async (teacher) => {
            if (!teacher || isNaN(body.phone)) {
                res.send({
                    success: 0,
                    message: 'Invaild phone or password'
                });
            } else if (!teacher.isAdmin) {
                const match = await bcrypt.compare(body.password, teacher.password);
                if (match) {
                    res.send({
                        success: 1,
                        message: 'login successfuly done!',
                        name: teacher.teacherName,
                        token: null
                    });
                } else {
                    res.send({
                        success: 0,
                        message: 'Invaild phone or password'
                    });
                }
            }
            else {
                const match = await bcrypt.compare(body.password, teacher.password);
                if (match) {
                    const token = jwt.sign({ paload: body.password },
                        'private123');
                    res.send({
                        success: 1,
                        message: 'login successfuly done!',
                        name: teacher.teacherName,
                        token: token
                    });
                } else {
                    res.send({
                        success: 0,
                        message: 'Invaild phone or password'
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
// Create new teacher
const createTeachers = async (req, res) => {
    const body = req.body;
    const saltRounds = 10;
    await TeacherController.Teacher.create({
        teacherId: body.teacherId,
        teacherName: body.teacherName,
        phone: body.phone,
        password: bcrypt.hashSync(body.password, saltRounds),
        isAdmin: body.isAdmin
    })
        .then((teacher) => {
            res.send({
                success: 1,
                message: 'Create teacher successfuly done!',
                data: teacher
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
// Read teacher by id 
const getTeacherById = async (req, res) => {
    await TeacherController.Teacher.findByPk(req.params.teacherId)
        .then((teacher) => {
            if (!teacher || isNaN(req.params.teacherId)) {
                res.send({
                    success: 0,
                    message: 'Teacher is not found!'
                });
            } else {
                res.send({
                    success: 1,
                    message: 'Get teacher successfuly done!',
                    data: teacher
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
// Read all teachers
const getTeachers = async (_req, res) => {
    await TeacherController.Teacher.findAll()
        .then((teachers) => {
            res.send({
                success: 1,
                message: 'Get teacher successfuly done!',
                data: teachers.length == 0 ? 'This table is empty!' : teachers
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
const updateTeacher = async (req, res) => {
    const body = req.body;
    await TeacherController.Teacher.update({
        teacherName: body.teacherName,
        phone: body.phone,
        password: body.password,
        isAdmin: body.isAdmin
    }, { where: { teacherId: body.teacherId } })
        .then((teacher) => {
            if (!teacher || isNaN(body.teacherId)) {
                res.send({
                    success: 0,
                    message: 'Teacher is not found!',
                });
            } else {
                res.send({
                    success: 1,
                    message: 'update teacher successfuly done!',
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
const deleteTeacher = async (req, res) => {
    const body = req.body;
    await TeacherController.Teacher.destroy({
        where: {
            teacherId: body.teacherId
        }
    })
        .then((teacher) => {
            if (!teacher || isNaN(body.teacherId)) {
                res.send({
                    success: 0,
                    message: 'Teacher is not found!',
                });
            } else {
                res.send({
                    success: 1,
                    message: 'delete teacher successfuly done!',
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
    loginTeacher,
    createTeachers,
    getTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
};