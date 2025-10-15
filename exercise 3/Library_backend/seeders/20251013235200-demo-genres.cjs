'use strict';
const dayjs = require('dayjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const now = dayjs().format('YYYY-MM-DD HH:mm:ss');

    try {
      await queryInterface.bulkInsert('genres', [
      {
        name: 'Ficción',
        description: 'Libros de ficción y literatura general',
        created_at: now,
        updated_at: now
      },
      {
        name: 'No Ficción',
        description: 'Libros basados en hechos reales y conocimiento',
        created_at: now,
        updated_at: now
      },
      {
        name: 'Ciencia Ficción',
        description: 'Libros de ciencia ficción y fantasía',
        created_at: now,
        updated_at: now
      },
      {
        name: 'Historia',
        description: 'Libros históricos y biografías',
        created_at: now,
        updated_at: now
      },
      {
        name: 'Infantil',
        description: 'Literatura para niños',
        created_at: now,
        updated_at: now
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
