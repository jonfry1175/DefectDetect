'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bug extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bug.init({
    title: DataTypes.STRING,
    build_version: DataTypes.STRING,
    expected_result: DataTypes.STRING,
    actual_result: DataTypes.STRING,
    image: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    severity_level_id: DataTypes.INTEGER,
    priority_level_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bug',
  });
  return Bug;
};