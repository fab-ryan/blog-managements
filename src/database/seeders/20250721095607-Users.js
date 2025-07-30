'use strict';

const { v4: uuidv4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     * 
    */
    await queryInterface.bulkInsert('users', [{
      id: uuidv4(),
      name: 'admin',
      email: 'admin@admin.com',
      password: '$2a$10$MJmeexiWZeudHkJ0zUtjI.ko2nHb6Cl6orAelfWlfyDaFx149mi9a',// password
      gender: 'male',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }])

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
