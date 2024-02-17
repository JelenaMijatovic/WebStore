'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OpremaTag extends Model {
    static associate({Oprema, Tag}) {
      this.belongsTo(Oprema, {foreignKey: "OpremaId", as: "oprema"});
      this.belongsTo(Tag, {foreignKey: "TagId", as: "tag"});
    }
  }
  OpremaTag.init({
    OpremaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TagId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'OpremaTag',
  });
  return OpremaTag;
};