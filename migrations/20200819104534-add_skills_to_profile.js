"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Profiles", "skills", {type:Sequelize.ARRAY(Sequelize.STRING),defaultValue: []});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Profiles", "skills");
  },
};
