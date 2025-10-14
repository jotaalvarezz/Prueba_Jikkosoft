'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const now = new Date();
      const lastWeek = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));

      await queryInterface.bulkInsert('loans', [
      {
        book_id: 1,
        member_id: 1,
        loan_date: lastWeek,
        returned_at: null, // Préstamo activo
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        book_id: 2,
        member_id: 2,
        loan_date: lastWeek,
        returned_at: null, // Préstamo activo
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        book_id: 3,
        member_id: 3,
        loan_date: lastWeek,
        returned_at: now, // Préstamo devuelto
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
      await queryInterface.bulkDelete('loans', null, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
