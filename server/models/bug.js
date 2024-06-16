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
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    build_version: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expected_result: {
      type: DataTypes.STRING,
      allowNull: false
    },
    actual_result: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    severity_level_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    priority_level_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Bug',
  });
  return Bug;
};