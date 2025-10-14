"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("books", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.BIGINT.UNSIGNED,
      },
      name: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: false,
        unique: true
      },
      author:{
        type: Sequelize.DataTypes.STRING(150),
        allowNull: true
      },
      library_id: {
        allowNull: false,
        type: Sequelize.DataTypes.BIGINT.UNSIGNED,
        references: {
          model: "libraries",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      description: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      cover_url: {
        type: Sequelize.DataTypes.STRING(500),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("books")
  },
};
