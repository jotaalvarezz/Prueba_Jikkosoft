"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Tabla intermedia para relación muchos a muchos entre books y genres
    await queryInterface.createTable("book_genres", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.BIGINT.UNSIGNED,
      },
      book_id: {
        allowNull: false,
        type: Sequelize.DataTypes.BIGINT.UNSIGNED,
        references: {
          model: "books",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      genre_id: {
        allowNull: false,
        type: Sequelize.DataTypes.BIGINT.UNSIGNED,
        references: {
          model: "genres",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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

    // Índice único para evitar duplicados (un libro no puede tener el mismo género dos veces)
    await queryInterface.addIndex("book_genres", ["book_id", "genre_id"], {
      unique: true,
      name: "unique_book_genre",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("book_genres");
  },
};

