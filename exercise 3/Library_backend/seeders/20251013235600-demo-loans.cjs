'use strict';
const dayjs = require('dayjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
      const lastWeek = dayjs().subtract(7, 'day').format('YYYY-MM-DD HH:mm:ss');

      await queryInterface.bulkInsert('loans', [
      {
        book_id: 1,
        member_id: 1,
        loan_date: lastWeek,
        returned_at: null, // Préstamo activo
        created_at: now,
        updated_at: now
      },
      {
        book_id: 2,
        member_id: 2,
        loan_date: lastWeek,
        returned_at: null, // Préstamo activo
        created_at: now,
        updated_at: now
      },
      {
        book_id: 3,
        member_id: 3,
        loan_date: lastWeek,
        returned_at: now, // Préstamo devuelto
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
      await queryInterface.bulkDelete('loans', null, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
