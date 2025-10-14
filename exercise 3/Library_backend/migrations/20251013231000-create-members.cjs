"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("members", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.BIGINT.UNSIGNED,
      },
      cc: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      names: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: false,
      },
      birthdate: {
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
      phone: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true,
      },
      email: {
        type: Sequelize.DataTypes.STRING(190),
        allowNull: false,
        unique: true,
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
    await queryInterface.dropTable("members");
  },
};

