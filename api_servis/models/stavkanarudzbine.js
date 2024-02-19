'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StavkaNarudzbine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Oprema, Narudzbina}) {
      this.belongsTo(Oprema, {foreignKey: "OpremaId", as: "oprema"});
      this.belongsTo(Narudzbina, {foreignKey: "NarudzbinaId", as: "narudzbina"});
    }
  }
  StavkaNarudzbine.init({
    komada: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    NarudzbinaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    OpremaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'StavkaNarudzbine',
  });
  return StavkaNarudzbine;
};