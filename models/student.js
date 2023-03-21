'use strict';
const {
  Model
} = require('sequelize');
export default (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Student.belongsTo(models.Level, {
        foreignKey: 'levelId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Student.init({
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    studentName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
        notNull: {
          msg: 'Please enter your name!'
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [10],
        notNull: {
          msg: 'Please enter your phone number!'
        }
      }
    },
    levelId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Student'
  });
  return Student;
};