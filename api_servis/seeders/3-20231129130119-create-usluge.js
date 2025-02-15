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
    await queryInterface.bulkInsert('uslugas',
    [
      {id:1, naziv: "Ciscenje sanitarnih cvorova", opis:"Temeljno ciscenje WC-a, umivaonika,podova i dezinfekcija", cena:5000, kategorija_id:1},
      {id:2, naziv:"Opste ciscenje", opis:"Temeljno ciscenje svih prostorija,prasine, usisavanje, brisanje povrsina...",cena:2900, kategorija_id:2},
      {id:3,naziv:"Pranje prozora", opis:"Efikasne usluge pranja sa bioloski prihvatljivim sredstvima.",cena:2500, kategorija_id:3}
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Usluga', null, {});
  }
};

