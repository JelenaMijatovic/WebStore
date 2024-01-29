'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Narudzbinas',
    [
        {id:"1", vreme_narucivanja:"5.10.2023", zakazano_vreme:"8.10.2023", status: "Novo", adresa:"Kralja Milana 12/2", telefon:"", ime_prezime:"Marko Marković"},
        {id:"2", vreme_narucivanja:"6.10.2023", zakazano_vreme:"6.10.2023", status: "Prihvaćena", adresa:"Knez Mihailova 6/6", telefon:"", ime_prezime:"Jovana Jovanović"}
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Narudzbinas', null, {});
  }
};
