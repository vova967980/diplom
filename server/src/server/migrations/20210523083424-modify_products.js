'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
          'Product_characteristics', // table name
          'productId', // new field name
          {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Products',
              key: 'id'
            },
            onDelete: 'CASCADE',
          },
      )]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
