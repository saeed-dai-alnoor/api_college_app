'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Levels', {
      levelId: {
        type: Sequelize.INTEGER,
        unique: true
      },
      levelName: {
        type: Sequelize.STRING,
        unique: true
      }
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('Levels');
  }
};