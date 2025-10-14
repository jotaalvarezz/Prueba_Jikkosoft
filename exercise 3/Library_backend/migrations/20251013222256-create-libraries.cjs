"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("libraries", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.BIGINT.UNSIGNED,
      },
      name: {
        type: Sequelize.DataTypes.STRING(150),
        allowNull: false,
        unique: true,
      },
      address: {
        type: Sequelize.DataTypes.STRING(250),
        allowNull: true,
      },
      email: {
        type: Sequelize.DataTypes.STRING(190),
        allowNull: true,
        unique: true,
      },
      phone: {
        type: Sequelize.DataTypes.STRING(190),
        allowNull: true,
        unique: true,
      },
      description: {
        type: Sequelize.DataTypes.TEXT,
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
    await queryInterface.dropTable("libraries");
  },
};
