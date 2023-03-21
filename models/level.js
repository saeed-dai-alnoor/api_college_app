'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Level.hasMany(models.Student, {
        foreignKey: 'levelId'
      });
    }
  }
  Level.init({
    levelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    levelName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 15],
        notNull: {
          msg: 'Please enter the level!'
        }
      }
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Level'
  });
  return Level;
};