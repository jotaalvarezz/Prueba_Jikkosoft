'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert('books', [
      {
        name: 'Cien años de soledad',
        author: 'Gabriel García Márquez',
        library_id: 1,
        description: 'Historia de la familia Buendía a lo largo de siete generaciones',
        cover_url: 'https://picsum.photos/seed/book-cien-anos/300/450',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: '1984',
        author: 'George Orwell',
        library_id: 1,
        description: 'Novela distópica sobre un futuro totalitario',
        cover_url: 'https://picsum.photos/seed/book-1984/300/450',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'El principito',
        author: 'Antoine de Saint-Exupéry',
        library_id: 1,
        description: 'Un clásico de la literatura infantil',
        cover_url: 'https://picsum.photos/seed/book-principito/300/450',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Breve historia del tiempo',
        author: 'Stephen Hawking',
        library_id: 1,
        description: 'Explicación accesible sobre el universo',
        cover_url: 'https://picsum.photos/seed/book-hawking/300/450',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Harry Potter y la piedra filosofal',
        author: 'J.K. Rowling',
        library_id: 1,
        description: 'Primera parte de la saga Harry Potter',
        cover_url: 'https://picsum.photos/seed/book-potter/300/450',
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
      await queryInterface.bulkDelete('books', null, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
