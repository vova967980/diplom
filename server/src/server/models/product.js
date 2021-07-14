'use strict';

module.exports = (sequelize, DataTypes) => {
    const product = sequelize.define('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            productName: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            productImageUrl: {
                allowNull: true,
                type: DataTypes.STRING
            },
            categoryId: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            firmId: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            availability: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            cost: {
                allowNull: false,
                type: DataTypes.INTEGER
            }
        },
        {
            timestamps: true
        });

    product.associate = function (models) {
        product.belongsTo(models.category, {foreignKey: 'categoryId', sourceKey: 'id'});
    };
    product.associate = function (models) {
        product.belongsTo(models.firm, {foreignKey: 'firmId', sourceKey: 'id'});
    };
    product.associate = function (models) {
        product.hasMany(models.product_characteristic, {foreignKey: 'productId', sourceKey: 'id'});
    };
    product.associate = function (models) {
        product.hasMany(models.order_product, {foreignKey: 'productId', sourceKey: 'id'});
    };

    return product;
};