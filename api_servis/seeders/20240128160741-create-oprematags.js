'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('oprematags',
    [
        {OpremaId:1, TagId:1},
        {OpremaId:2, TagId:1},
        {OpremaId:2, TagId:2}
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('OpremaTags');
  }
};
