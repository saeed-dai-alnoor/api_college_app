'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Teachers', {
      teacherId: {
        type: Sequelize.INTEGER,
        unique: true
      },
      teacherName: {
        type: Sequelize.STRING,
        unique: true
      },
      teacherLog: Sequelize.STRING,
      phone: {
        type: Sequelize.STRING,
        unique: true
      },
      password: Sequelize.STRING,
      isAdmin: Sequelize.BOOLEAN
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Teachers');
  }
};