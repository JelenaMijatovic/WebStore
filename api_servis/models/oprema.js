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
    static associate({Kategorija, Tag, Narudzbina}) {
      this.belongsTo(Kategorija, {foreignKey: "kategorija_id", as: "kategorija"});
      this.belongsToMany(Narudzbina, {foreignKey: "OpremaId", as: "narudzbine", through:"StavkaNarudzbine"});
      this.belongsToMany(Tag, {foreignKey: "OpremaId", as: "tagovi", through:"OpremaTag", onDelete: 'cascade'});
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