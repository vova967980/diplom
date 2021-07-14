'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Product_characteristics', {
            id: {
                allowNull: false,
                autoIncrement: true,
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            productId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Products',
                    key: 'id'
                }
            },
            characteristicId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Characteristics',
                    key: 'id'
                }
            },
            characteristicValue: {
                type: Sequelize.STRING,
                allowNull: false
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Product_characteristics');
    }
};