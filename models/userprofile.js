'use strict';
const {
  Model
} = require('sequelize');

// gender constants
const MALE = 'M'
const FEMALE = 'F'

module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
        as: 'user'
      })
    }

    toJSON() {
      return {...this.get(), id: undefined, userId: undefined}
    }
  };
  UserProfile.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstname: DataTypes.STRING,
    middlename: DataTypes.STRING,
    lastname: DataTypes.STRING,
    mobile: DataTypes.STRING,
    gender: {
      type: DataTypes.ENUM(MALE, FEMALE),
      defaultValue: MALE
    },
    birthday: DataTypes.DATEONLY
  }, {
    sequelize,
    tableName: 'usersprofile',
    modelName: 'UserProfile',
  });

  return UserProfile;
};