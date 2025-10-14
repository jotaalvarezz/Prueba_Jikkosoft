'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert('members', [
      {
        cc: '1001001001',
        names: 'Juan Carlos',
        last_name: 'Pérez',
        birthdate: new Date('1990-05-15'),
        phone: '300-123-4567',
        email: 'juan.perez@email.com',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cc: '1001001002',
        names: 'María',
        last_name: 'González',
        birthdate: new Date('1985-08-22'),
        phone: '300-123-4568',
        email: 'maria.gonzalez@email.com',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        cc: '1001001003',
        names: 'Pedro',
        last_name: 'Ramírez',
        birthdate: new Date('1995-03-10'),
        phone: '300-123-4569',
        email: 'pedro.ramirez@email.com',
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
      await queryInterface.bulkDelete('members', null, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
