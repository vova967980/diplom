'use strict';

module.exports = (sequelize, DataTypes) => {
  const characteristic = sequelize.define('Characteristics', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        characteristicName: {
          allowNull: false,
          type: DataTypes.STRING
        },
        measureId: {
            allowNull: true,
            type: DataTypes.INTEGER,

        }
      },
      {
        timestamps: false
      });
    characteristic.associate = function (models) {
        characteristic.hasMany(models.product_characteristic, {foreignKey: 'characteristicId', sourceKey: 'id'});
    };
    characteristic.associate = function (models) {
        characteristic.belongsTo(models.measure, {foreignKey: 'measureId', sourceKey: 'id'});
    };

  return characteristic;
};