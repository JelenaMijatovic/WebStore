'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stavkanarudzbines',
    [
        {OpremaId:1, NarudzbinaId:1, komada:1},
        {OpremaId:2, NarudzbinaId:1, komada:1},
        {OpremaId:2, NarudzbinaId:2, komada:2},
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('StavkaNarudzbines');
  }
};
