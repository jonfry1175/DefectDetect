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

      // level has many bugs
      Level.hasMany(models.Bug, { foreignKey: 'severity_level_id', as: 'SeverityLevelBugs' });

      // level has many bugs
      Level.hasMany(models.Bug, { foreignKey: 'priority_level_id', as: 'PriorityLevelBugs' });
    }
  }
  Level.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Level',
  });

  // unique constraint for name
  Level.beforeCreate(async (level, options) => {
    const existingLevel = await Level.findOne({
      where: {
        name: level.name
      }
    });
    if (existingLevel) {
      throw new Error('Level with this name already exists');
    }
  });
  return Level;
};