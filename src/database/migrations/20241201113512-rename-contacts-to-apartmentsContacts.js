'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable("contacts", "apartmentsContacts");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable("apartmentsContacts", "contacts");
  },
};
