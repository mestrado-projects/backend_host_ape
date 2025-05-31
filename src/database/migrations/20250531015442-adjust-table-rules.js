'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("apartments_rules", "guests_quantity");

    await queryInterface.addColumn("apartments_rules", "guests_quantity", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("apartments_rules", "guests_quantity");

    await queryInterface.addColumn("apartments_rules", "guests_quantity", {
      type: Sequelize.TIME,
      allowNull: true,
    });
  }
};
