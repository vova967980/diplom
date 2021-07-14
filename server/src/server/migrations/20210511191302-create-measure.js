'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Measures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      measureName: {
        type: Sequelize.STRING
      }
    });
    await queryInterface.changeColumn('Product_characteristics', 'characteristicValue', {
      type: 'FLOAT USING CAST("characteristicValue" as FLOAT)',
      allowNull: false
    });
    await queryInterface.addColumn('Characteristics','measureId',{
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Measures',
        key: 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Characteristics','measureId');
    await queryInterface.dropTable('Measures');
  }
};