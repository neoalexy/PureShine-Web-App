'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Upit extends Model {
    }

  Upit.init({
    ime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      adresa: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telefon: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zakazanoVreme: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      upit: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
    sequelize,
    modelName: 'Upit',
    timestamps: false
  });
  return Upit;
};