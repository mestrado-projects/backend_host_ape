/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("bookings", "bookings_guest_id_fkey")

    await queryInterface.renameColumn("bookings", "guest_id", "user_id")

    await queryInterface.addConstraint("bookings", {
      fields: ["user_id"],
      type: "foreign key",
      name: "bookings_user_id_fkey",
      references: {
        table: "users",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("bookings", "bookings_user_id_fkey")

    await queryInterface.renameColumn("bookings", "user_id", "guest_id")

    await queryInterface.addConstraint("bookings", {
      fields: ["guest_id"],
      type: "foreign key",
      name: "bookings_guest_id_fkey",
      references: {
        table: "guests",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    })
  },
}
