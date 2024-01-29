'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OpremaTag extends Model {
    static associate({Oprema, Tag}) {
      this.belongsTo(Oprema, {foreignKey: "oprema_id", as: "oprema"});
      this.belongsTo(Tag, {foreignKey: "tag_id", as: "tag"});
    }
  }
  OpremaTag.init({
    oprema_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'OpremaTag',
  });
  return OpremaTag;
};