'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: 'role_id' });
      User.hasMany(models.Bug, { foreignKey: 'user_id' });
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name cannot be empty'
        },
        len: {
          args: [3, 20],
          msg: 'Name must be between 3 and 20 characters'
        },
        is: {
          args: /^[a-zA-Z\s]*$/,
          msg: 'Name must only contain letters and spaces'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email cannot be empty'
        },
        isEmail: {
          msg: 'Invalid email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty'
        },
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  // unique name and email
  // User.beforeCreate(async (user, options) => {
  //   const existsName = await User.findOne({ where: { name: user.name } });
  //   const existsEmail = await User.findOne({ where: { email: user.email } });

  //   if (existsName) {
  //     throw new Error('Name already exists');
  //   }

  //   if (existsEmail) {
  //     throw new Error('Email already exists');
  //   }

  // })
  return User;
};
