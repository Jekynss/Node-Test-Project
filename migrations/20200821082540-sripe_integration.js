'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('Users', 'customer_id', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Users', 'subscription', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('Users', 'status', {
        type: Sequelize.STRING,
      })
    ];
  },

  down: async (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('Users', 'customer_id'),
      queryInterface.removeColumn('Users', 'subscription'),
      queryInterface.removeColumn('Users', 'status')
    ];
  }
};
