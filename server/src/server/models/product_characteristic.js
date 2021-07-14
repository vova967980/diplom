'use strict';

module.exports = (sequelize, DataTypes) => {
    const product_characteristic = sequelize.define('Product_characteristics', {
            id: {
                allowNull: false,
                autoIncrement: true,
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            productId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            characteristicId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            characteristicValue: {
                allowNull: false,
                type: DataTypes.FLOAT
            },
        },
        {
            timestamps: false
        });
    product_characteristic.associate = function (models) {
        product_characteristic.belongsTo(models.characteristic, {foreignKey: 'characteristicId', sourceKey: 'id'});
    };
    product_characteristic.associate = function (models) {
        product_characteristic.belongsTo(models.product, {foreignKey: 'productId', sourceKey: 'id'});
    };

    return product_characteristic;
};