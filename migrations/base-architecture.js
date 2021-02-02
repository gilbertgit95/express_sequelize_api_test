'use strict';

// gender constants
const MALE = 'M'
const FEMALE = 'F'

module.exports = {
  up: async (queryInterface, DataTypes) => {
    // for users
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });

    // for user profile
    await queryInterface.createTable('usersprofile', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      firstname: {
        type: DataTypes.STRING
      },
      middlename: {
        type: DataTypes.STRING
      },
      lastname: {
        type: DataTypes.STRING
      },
      mobile: {
        type: DataTypes.STRING
      },
      gender: {
        type: DataTypes.ENUM(MALE, FEMALE),
        defaultValue: MALE
      },
      birthday: {
        type: DataTypes.DATEONLY
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('usersprofile');
  }
};