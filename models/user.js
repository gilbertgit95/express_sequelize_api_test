'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({UserProfile}) {
      // define association here
      this.hasOne(UserProfile, {foreignKey: 'userId', as: 'userProfile'})
    }

    toJSON() {
      return {...this.get(), id: undefined, password: undefined}
    }
  };
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Should have a password'
        },
        notEmpty: {
          msg: 'Should have a password'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Should have a username'
        },
        notEmpty: {
          msg: 'Should have a username'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Should have a email'
        },
        notEmpty: {
          msg: 'Should have a email'
        },
        isEmail: {
          msg: 'Must be a valid email'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};