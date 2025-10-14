'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Iniciamos la transacción
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert('libraries', [
        {
          name: 'Biblioteca Central',
          address: 'Calle Principal 123',
          email: 'central@biblioteca.com',
          phone: '123-456-7890',
          description: 'Biblioteca principal de la ciudad con amplias salas de lectura, ' +
                      'sección infantil, área de computadoras y sala de estudio grupal',
          created_at: new Date(),
          updated_at: new Date()
        }
      ], { transaction });

      // Si todo sale bien, confirmamos la transacción
      await transaction.commit();
    } catch (error) {
      // Si hay error, revertimos la transacción
      await transaction.rollback();
      throw error; // Re-lanzamos el error para que Sequelize lo maneje
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
