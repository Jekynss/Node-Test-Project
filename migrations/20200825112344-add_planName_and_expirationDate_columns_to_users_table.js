'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('Users', 'planName', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Users', 'expirationDate', {
        type: Sequelize.DATE
      })
    ];
  },

  down: async (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('Users', 'planName'),
      queryInterface.removeColumn('Users', 'expirationDate'),
    ];
  }
};