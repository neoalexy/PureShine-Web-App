'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rezervacija extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({StavkaRezervacije, Usluga}) {
      // define association here
      this.hasMany (StavkaRezervacije, {foreignKey: "rezervacija_id", as:"stavke"});
      //this.belongsToMany(Usluga, {through: StavkaRezervacije,foreignKey: "rezervacija_id",as: "usluge" }); //otherKey: "usluga_id"
    }
  }
  Rezervacija.init({
    vreme_narucivanja: {
      type: DataTypes.DATE,
      unique: true,
      allowNull: false
  }, 
  zakazano_vreme: {
      type: DataTypes.DATE,
      allowNull: true
  }, 
  status: {
    type: DataTypes.STRING(120),
    allowNull: false
  }, 
  adresa: {
    type: DataTypes.TEXT,
    allowNull: false
},   
telefon: {
  type: DataTypes.TEXT,
  allowNull: false
}, 
ime_prezime: {
  type: DataTypes.TEXT,
  allowNull: false
}
  }, {
    sequelize,
    modelName: 'Rezervacija',
    timestamps: false
  });
  return Rezervacija;
};