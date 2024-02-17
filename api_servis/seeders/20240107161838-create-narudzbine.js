'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Narudzbinas',
    [
        {id:"1", vreme_narucivanja:new Date(), zakazano_vreme:new Date(), status_id: 1, adresa:"Kralja Milana 12/2", telefon:"", user_id:1},
        {id:"2", vreme_narucivanja:new Date(), zakazano_vreme:new Date(), status_id: 2, adresa:"Knez Mihailova 6/6", telefon:"", user_id:1}
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Narudzbinas', null, {});
  }
};
