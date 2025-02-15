// const { Model, DataTypes } = require('sequelize');
// const { sequelize, models } = require('./index');

// class Users extends Model {
//   static associate(models) {
   
//   }
// }
'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
  
  }

Users.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
       isEmail: {
         msg: "Nije email"
        }
      }
    }
  },
  {
    sequelize,
    modelName: 'Users',
  });

  return Users; };

// module.exports = Users;