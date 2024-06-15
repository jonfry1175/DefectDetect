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

      // fungsi "as" untuk menghindari kebingungan dalam relasi ganda ke model yang sama (Level).

      // bug belongs to user
      Bug.belongsTo(models.User, { foreignKey: 'user_id' });

      //  menambahkan alias (as) untuk severity_level_id dan priority_level_id untuk membedakan dua relasi berbeda ke model Bug.

      // bug belongs to severity level
      Bug.belongsTo(models.Level, { foreignKey: 'severity_level_id', as: 'SeverityLevel' });

      // bug belongs to priority level
      Bug.belongsTo(models.Level, { foreignKey: 'priority_level_id', as: 'PriorityLevel' });
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