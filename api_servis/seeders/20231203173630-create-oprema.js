'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Opremas',
    [
        {id:"1",naziv:"Superlux HD681", opis:"", cena: 3000, kategorija_id:1},
        {id:"2",naziv:"FiiO F3", opis:"", cena: 2500, kategorija_id:2}
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Opremas', null, {});
  }
};
