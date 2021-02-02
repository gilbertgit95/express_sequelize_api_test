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
    static associate(models) {
      // define association here
    }

    toJSON() {
      return {...this.get(), id: undefined}
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

  UserProfile.associate = models => {
    UserProfile.belongsTo(models.User, {
      foreignKey: {
        name: 'fkuser',
        allowNull: false
      }
    })
  }

  return UserProfile;
};