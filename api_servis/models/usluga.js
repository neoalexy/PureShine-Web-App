'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usluga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({Kategorija, Oprema, StavkaRezervacije}) {
       this.belongsTo(Kategorija, {foreignKey:"kategorija_id", as: "kategorija"});
      this.hasMany(StavkaRezervacije, {foreignKey: "usluga_id", as: "stavke"});
      this.belongsToMany(Oprema, {foreignKey: "usluga_id", as: "opreme", through:"UslugaOprema"});
     }
  }
  Usluga.init({
    // naziv: DataTypes.STRING,
    // opis: DataTypes.STRING,
    // cena: DataTypes.INTEGER
    naziv: {
      type: DataTypes.STRING(120),
      unique: true,
      allowNull: false
  }, 
  opis: {
      type: DataTypes.TEXT,
      allowNull: true
  }, 
  cena: {
      type: DataTypes.INTEGER,
      allowNull: false
  }, 
  kategorija_id: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
  slika: {
    type: DataTypes.STRING, 
    allowNull: true,
   }

  }, {
    sequelize,
    modelName: 'Usluga',
  });
  return Usluga;
};