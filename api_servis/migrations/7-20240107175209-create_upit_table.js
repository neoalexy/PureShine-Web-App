'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Upit', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ime: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      adresa: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telefon: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      zakazanoVreme: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      upit: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Upit');
  },
};