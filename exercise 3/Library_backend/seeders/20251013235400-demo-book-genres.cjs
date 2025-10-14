'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert('book_genres', [
      {
        book_id: 1,
        genre_id: 1, // Ficción
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        book_id: 2,
        genre_id: 1, // Ficción
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        book_id: 2,
        genre_id: 3, // Ciencia Ficción
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        book_id: 3,
        genre_id: 5, // Infantil
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        book_id: 4,
        genre_id: 2, // No Ficción
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        book_id: 5,
        genre_id: 1, // Ficción
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        book_id: 5,
        genre_id: 5, // Infantil
        created_at: new Date(),
        updated_at: new Date()
      }
    ], { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('book_genres', null, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
