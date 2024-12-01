'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('apartments', 'price', 'basicPrice');
    
    await queryInterface.renameColumn('apartments', 'location', 'simpleLocation');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('apartments', 'basicPrice', 'price');
    
    await queryInterface.renameColumn('apartments', 'simpleLocation', 'location');
  },
};
