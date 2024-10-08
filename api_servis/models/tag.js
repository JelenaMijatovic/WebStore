'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Oprema}) {
      this.belongsToMany(Oprema, {foreignKey: "TagId", as: "oprema", through:"OpremaTag", onDelete: 'cascade'});
    }
  }
  Tag.init({
    naziv: {
      type: DataTypes.STRING(120),
      unique: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};