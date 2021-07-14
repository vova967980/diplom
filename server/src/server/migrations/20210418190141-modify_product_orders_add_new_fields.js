'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
          'Order_products', // table name
          'count', // new field name
          {
            allowNull: true,
            type: Sequelize.INTEGER,
            defaultValue: 1
          },
      )]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Order_products', 'count')
        ]);
  }
};
