/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      CREATE TYPE enum_users_role_new AS ENUM ('ROLE_ADMIN', 'ROLE_GUEST');
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE users ALTER COLUMN role DROP DEFAULT;
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE users
      ALTER COLUMN role
      TYPE enum_users_role_new
      USING CASE
        WHEN role = 'guest' THEN 'ROLE_GUEST'::text::enum_users_role_new
        WHEN role = 'admin' THEN 'ROLE_ADMIN'::text::enum_users_role_new
        ELSE 'ROLE_GUEST'::text::enum_users_role_new
      END;
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE users ALTER COLUMN role SET DEFAULT 'ROLE_GUEST';
    `);

    await queryInterface.sequelize.query(`
      DROP TYPE enum_users_role;
    `);

    await queryInterface.sequelize.query(`
      ALTER TYPE enum_users_role_new RENAME TO enum_users_role;
    `);

    await queryInterface.createTable("guests", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date_of_birth: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      document_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      preferences: {
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("guests");

    await queryInterface.sequelize.query(`
      CREATE TYPE enum_users_role_old AS ENUM ('guest', 'admin');
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE users ALTER COLUMN role DROP DEFAULT;
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE users
      ALTER COLUMN role
      TYPE enum_users_role_old
      USING CASE
        WHEN role = 'ROLE_GUEST' THEN 'guest'::text::enum_users_role_old
        WHEN role = 'ROLE_ADMIN' THEN 'admin'::text::enum_users_role_old
        ELSE 'guest'::text::enum_users_role_old
      END;
    `);

    await queryInterface.sequelize.query(`
      ALTER TABLE users ALTER COLUMN role SET DEFAULT 'guest';
    `);

    await queryInterface.sequelize.query(`
      DROP TYPE enum_users_role;
    `);

    await queryInterface.sequelize.query(`
      ALTER TYPE enum_users_role_old RENAME TO enum_users_role;
    `);
  },
};
