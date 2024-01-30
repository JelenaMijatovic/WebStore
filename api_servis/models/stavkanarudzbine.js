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
      this.belongsTo(Oprema, {foreignKey: "oprema_id", as: "oprema"});
      this.belongsTo(Narudzbina, {foreignKey: "narudzbina_id", as: "narudzbina"});
    }
  }
  StavkaNarudzbine.init({
    komada: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    narudzbina_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    oprema_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'StavkaNarudzbine',
  });
  return StavkaNarudzbine;
};