'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Narudzbina extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Status, Oprema, User}) {
      this.belongsTo(Status, {foreignKey: "status_id", as: "status"});
      this.belongsTo(User, {foreignKey: "user_id", as: "user"});
      this.belongsToMany(Oprema, {foreignKey: "NarudzbinaId", as: "oprema", through:"StavkaNarudzbine"});
    }
  }
  Narudzbina.init({
    vreme_narucivanja: {
      type: DataTypes.DATE(),
      allowNull: false
    },
    zakazano_vreme: {
      type: DataTypes.DATE(),
      allowNull: false
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    adresa: {
      type: DataTypes.TEXT(),
      allowNull: false
    },
    telefon: {
      type: DataTypes.TEXT(),
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Narudzbina',
  });
  return Narudzbina;
};