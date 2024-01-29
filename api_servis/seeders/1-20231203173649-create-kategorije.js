'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('kategorijas',
    [
        {id:"1",naziv:"Slušalice"},
        {id:"2",naziv:"IME"}
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('kategorijas', null, {});
  }
};
