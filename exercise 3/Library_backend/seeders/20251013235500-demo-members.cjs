'use strict';
const dayjs = require('dayjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const now = dayjs().format('YYYY-MM-DD HH:mm:ss');

    try {
      await queryInterface.bulkInsert('members', [
      {
        cc: '1001001001',
        names: 'Juan Carlos',
        last_name: 'Pérez',
        birthdate: '1990-05-15',
        phone: '3001234567',
        email: 'juan.perez@email.com',
        created_at: now,
        updated_at: now
      },
      {
        cc: '1001001002',
        names: 'María',
        last_name: 'González',
        birthdate: '1985-08-22',
        phone: '3001234568',
        email: 'maria.gonzalez@email.com',
        created_at: now,
        updated_at: now
      },
      {
        cc: '1001001003',
        names: 'Pedro',
        last_name: 'Ramírez',
        birthdate: '1995-03-10',
        phone: '3001234569',
        email: 'pedro.ramirez@email.com',
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
      await queryInterface.bulkDelete('members', null, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
