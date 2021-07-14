'use strict';

module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('Categories', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        categoryName: {
          allowNull: false,
          type: DataTypes.STRING
        }
      },
      {
        timestamps: false
      });

    category.associate = function (models) {
        category.hasMany(models.product, {foreignKey: 'categoryId', sourceKey: 'id'});
    };

  return category;
};