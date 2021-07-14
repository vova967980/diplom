'use strict';

module.exports = (sequelize, DataTypes) => {
  const firm = sequelize.define('Firms', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        firmName: {
          allowNull: false,
          type: DataTypes.STRING
        }
      },
      {
        timestamps: false
      });

    firm.associate = function (models) {
        firm.hasMany(models.product, {foreignKey: 'firmId', sourceKey: 'id'});
    };

  return firm;
};