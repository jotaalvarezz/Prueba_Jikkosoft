'use strict';
const dayjs = require('dayjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    const transaction = await queryInterface.sequelize.transaction();
    const now = dayjs().format('YYYY-MM-DD HH:mm:ss');

    try {
      await queryInterface.bulkInsert('libraries', [
        {
          name: 'Biblioteca Central',
          address: 'Calle Principal 123',
          email: 'central@biblioteca.com',
          phone: '1234567890',
          description: 'Biblioteca principal de la ciudad con amplias salas de lectura, ' +
                      'sección infantil, área de computadoras y sala de estudio grupal',
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
      await queryInterface.bulkDelete('libraries', null, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
