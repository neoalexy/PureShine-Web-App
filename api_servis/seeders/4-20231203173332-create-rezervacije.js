'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('rezervacijas',
    [
      {id:1, vreme_narucivanja: '01-12-2023 12:00', zakazano_vreme:'03-12-2023 15:30', status:"Aktivna", adresa: "Bulevar Kralja Aleksanda 221", telefon: "0612345678", ime_prezime: "Pera Mitic"},
      {id:2, vreme_narucivanja: '02-12-2023 16:20', zakazano_vreme:'04-12-2023 10:30', status:"Aktivna", adresa: "Bulevar Zorana Djindjica 15", telefon: "0615532456", ime_prezime: "Milena Ristic"},
      {id:3, vreme_narucivanja: '03-12-2023 19:00', zakazano_vreme:'05-12-2023 08:30', status:"Aktivna", adresa: "Ustanicka", telefon: "0643332224", ime_prezime: "Marko Markovic"}
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Rezervacija', null, {});
  }
};
