'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UslugaOprema extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Usluga, Oprema}) {
      this.belongsTo(Usluga, {foreignKey : "usluga_id", as:"usluga"});
      this.belongsTo(Oprema, {foreignKey: "oprema_id", as: "opreme"});
    }
  }
  UslugaOprema.init({
    usluga_id: {
      type: DataTypes.INTEGER,
      allowNull: false
  } ,
  oprema_id: {
    type: DataTypes.INTEGER,
    allowNull: false
} 
  }, {
    sequelize,
    modelName: 'UslugaOprema',
  });
  return UslugaOprema;
};