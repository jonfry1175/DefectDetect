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

    // await queryInterface.bulkInsert('Roles', [
    //   {
    //     name: 'QA',
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   },
    //   {
    //     name: 'Developer',
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   }
    // ])

    // create level data
    await queryInterface.bulkInsert('Levels', [
      {
        name: 'Low',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Medium',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'High',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])

    // await queryInterface.bulkInsert("Users", [
    //   {
    //     name: "Admin",
    //     email: "X6qJt@example.com",
    //     password: "admin",
    //     role_id: 11,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   }
    // ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    // await queryInterface.bulkDelete('Roles', null, {})
  }
};
