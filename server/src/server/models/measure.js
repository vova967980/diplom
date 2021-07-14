'use strict';

module.exports = (sequelize, DataTypes) => {
  const measure = sequelize.define('Measures', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        measureName: {
          allowNull: false,
          type: DataTypes.STRING
        }
      },
      {
        timestamps: false
      });

  measure.associate = function (models) {
      measure.hasMany(models.characteristic, {foreignKey: 'measureId', sourceKey: 'id'});
  };

  return measure;
};