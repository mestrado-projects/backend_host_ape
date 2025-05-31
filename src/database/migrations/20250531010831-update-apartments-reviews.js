/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("apartment_reviews", "apartment_reviews_user_id_fkey")

    await queryInterface.renameColumn("apartment_reviews", "user_id", "guest_id")

    await queryInterface.addConstraint("apartment_reviews", {
      fields: ["guest_id"],
      type: "foreign key",
      name: "apartment_reviews_guest_id_fkey",
      references: {
        table: "guests",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("apartment_reviews", "apartment_reviews_guest_id_fkey")

    await queryInterface.renameColumn("apartment_reviews", "guest_id", "user_id")

    await queryInterface.addConstraint("apartment_reviews", {
      fields: ["user_id"],
      type: "foreign key",
      name: "apartment_reviews_user_id_fkey",
      references: {
        table: "users",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    })
  },
}
