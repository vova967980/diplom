'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customerEmail: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      customerName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      customerPatronymic: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      customerSurname: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      customerCity: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      customerPhoneNumber: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      cost: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'pending',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};