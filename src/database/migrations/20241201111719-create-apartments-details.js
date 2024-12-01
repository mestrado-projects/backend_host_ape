'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("apartmentsDetails", {
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
        onUpdate: "CASCADE", 
        onDelete: "CASCADE",
      },
      type: {
        type: Sequelize.ENUM("Studio", "Apartment"),
        allowNull: false,
      },
      bathroom: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      bedroom: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      kitchen: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      beds: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      about: {
        type: Sequelize.TEXT,
        allowNull: true,
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
    await queryInterface.dropTable("apartmentsDetails");
  }
};
