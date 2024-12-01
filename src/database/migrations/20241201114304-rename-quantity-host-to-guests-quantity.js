'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "apartmentsRules",
      "quantity_host",
      "guests_quantity"
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "apartmentsRules", 
      "guests_quantity",
      "quantity_host"
    );
  }
};
