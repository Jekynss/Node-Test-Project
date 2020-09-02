'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.removeColumn(
      'Projects',
      'developers'
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Projects',
      'developers',
     Sequelize.ARRAY(Sequelize.INTEGER)
    );
  }
};
