/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("testimonials", "testimonials_user_id_fkey")

    await queryInterface.renameColumn("testimonials", "user_id", "guest_id")

    await queryInterface.addConstraint("testimonials", {
      fields: ["guest_id"],
      type: "foreign key",
      name: "testimonials_guest_id_fkey",
      references: {
        table: "guests",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("testimonials", "testimonials_guest_id_fkey")

    await queryInterface.renameColumn("testimonials", "guest_id", "user_id")

    await queryInterface.addConstraint("testimonials", {
      fields: ["user_id"],
      type: "foreign key",
      name: "testimonials_user_id_fkey",
      references: {
        table: "users",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    })
  },
}
