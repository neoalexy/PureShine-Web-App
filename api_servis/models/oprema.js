'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Oprema extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Usluga}) {
      // define association here
      this.belongsToMany(Usluga, {through: "UslugaOprema", foreignKey: "oprema_id", as: "usluga"}) //as?
    }
  }
  Oprema.init({
    naziv: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Oprema',
  });
  return Oprema;
};