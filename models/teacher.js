'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Teacher.init({
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    teacherName: {
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your password!'
        }
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Teacher'
  });
  return Teacher;
};