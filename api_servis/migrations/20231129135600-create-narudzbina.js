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
      status_id: {
        allowNull: false,
        references: {
          model: 'statuses',
          key: 'id',
        },
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        type: Sequelize.INTEGER
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