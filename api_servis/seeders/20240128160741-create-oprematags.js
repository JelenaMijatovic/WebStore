'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('oprematags',
    [
        {oprema_id:1, tag_id:1},
        {oprema_id:2, tag_id:1},
        {oprema_id:2, tag_id:2}
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('OpremaTags');
  }
};
