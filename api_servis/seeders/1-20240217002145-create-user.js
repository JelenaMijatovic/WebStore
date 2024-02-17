'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users',
    [
        {id:"1", username:"admin", password:"$2b$10$o571OMqXTYGfu2.Ibp7rnuWhPwtW2CoIjIyTXwQjJkCeC4GEYe3Ta", email:"admin@raf.rs", admin:1},
        {id:"2", username:"user", password:"user", email:"user@raf.rs", admin:0}
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
