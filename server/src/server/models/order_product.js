'use strict';

module.exports = (sequelize, DataTypes) => {
    const order_product = sequelize.define('Order_products', {
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
            orderId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            count: {
                allowNull: true,
                type: DataTypes.INTEGER,
                defaultValue: 1
            }
        },
        {
            timestamps: false
        });

    order_product.associate = function (models) {
        order_product.belongsTo(models.product, {foreignKey: 'productId', sourceKey: 'id'});
    };
    order_product.associate = function (models) {
        order_product.belongsTo(models.order, {foreignKey: 'orderId', sourceKey: 'id'});
    };

    return order_product;
};