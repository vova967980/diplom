'use strict';

module.exports = (sequelize, DataTypes) => {
    const order = sequelize.define('Orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            customerEmail: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            customerName: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            customerPatronymic: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            customerSurname: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            customerCity: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            customerPhoneNumber: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            cost: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            status: {
                allowNull: true,
                type: DataTypes.STRING,
                defaultValue: 'pending',
            }
        },
        {
            timestamps: true
        });

    order.associate = function (models) {
        order.hasMany(models.order_product, {foreignKey: 'orderId', sourceKey: 'id'});
    };


    return order;
};