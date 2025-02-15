'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StavkaRezervacije extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Usluga, Rezervacija}) {
      // define association here
      this.belongsTo(Usluga, {foreignKey: "usluga_id", as:"usluga"});
      this.belongsTo(Rezervacija, {foreignKey: "rezervacija_id", as:"rezervacija"});
    }
  }
  StavkaRezervacije.init({
    //komada: DataTypes.INTEGER
    rezervacija_id: {
      type: DataTypes.INTEGER,
      //unique: true,
      allowNull: false
  }, 
  usluga_id: {
      type: DataTypes.TEXT,
      allowNull: false
  }, 
  komada: {
      type: DataTypes.INTEGER,
      allowNull: false
  }, 
  jedinicna_cena: {
      type: DataTypes.INTEGER,
      allowNull: false
  } 
  }, {
    sequelize,
    modelName: 'StavkaRezervacije',
  });
  return StavkaRezervacije;
};