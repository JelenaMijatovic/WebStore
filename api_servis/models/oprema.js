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
    static associate({Kategorija, Tag, StavkaNarudzbine}) {
      this.belongsTo(Kategorija, {foreignKey: "kategorija_id", as: "kategorija"});
      this.hasMany(StavkaNarudzbine, {foreignKey: "oprema_id", as: "stavke"});
      this.belongsToMany(Tag, {foreignKey: "oprema_id", as: "tagovi", through:"OpremaTag"});
    }
  }
  Oprema.init({
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
    }  
  }, {
    sequelize,
    modelName: 'Oprema',
  });
  return Oprema;
};