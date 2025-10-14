'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert('genres', [
      {
        name: 'Ficción',
        description: 'Libros de ficción y literatura general',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'No Ficción',
        description: 'Libros basados en hechos reales y conocimiento',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Ciencia Ficción',
        description: 'Libros de ciencia ficción y fantasía',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Historia',
        description: 'Libros históricos y biografías',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Infantil',
        description: 'Literatura para niños',
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
      await queryInterface.bulkDelete('genres', null, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
