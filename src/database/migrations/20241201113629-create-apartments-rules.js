'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable("apartments_rules", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      apartment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "apartments",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      check_in: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      check_out: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      guests_quantity: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("apartmentsRules");    
  }
};
