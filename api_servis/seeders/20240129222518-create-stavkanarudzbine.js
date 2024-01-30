'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stavkanarudzbines',
    [
        {oprema_id:1, narudzbina_id:1, komada:1},
        {oprema_id:2, narudzbina_id:1, komada:1},
        {oprema_id:2, narudzbina_id:2, komada:2},
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('StavkaNarudzbines');
  }
};
