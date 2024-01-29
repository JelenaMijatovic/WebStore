'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Narudzbinas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      vreme_narucivanja: {
        type: Sequelize.DATE,
        allowNull: false
      },
      zakazano_vreme: {
        type: Sequelize.DATE,
        allowNull: false
      },
      adresa: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      telefon: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      ime_prezime: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Narudzbinas');
  }
};