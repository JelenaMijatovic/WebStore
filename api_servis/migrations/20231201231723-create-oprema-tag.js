'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OpremaTags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      oprema_id: {
        allowNull: false,
        references: {
          model: 'opremas',
          key: 'id',
        },
        type: Sequelize.INTEGER
      },
      tag_id: {
        allowNull: false,
        references: {
          model: 'tags',
          key: 'id',
        },
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OpremaTags');
  }
};