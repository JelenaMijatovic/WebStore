'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('statuses',
    [
        {id:"1",naziv:"Novo"},
        {id:"2",naziv:"Prihvaćeno"},
        {id:"3",naziv:"Odbijeno"},
        {id:"4",naziv:"U pripremi"},
        {id:"5",naziv:"U dostavi"},
        {id:"6",naziv:"Završeno"},
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('statuses', null, {});
  }
};
