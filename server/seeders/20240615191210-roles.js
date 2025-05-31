'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Helper function to check and create records
    async function checkAndCreate(table, records, uniqueField) {
      for (const item of records) {
        // Check if record exists
        const existingRecord = await queryInterface.sequelize.query(
          `SELECT id FROM "${table}" WHERE "${uniqueField}" = ?`,
          {
            replacements: [item[uniqueField]],
            type: queryInterface.sequelize.QueryTypes.SELECT
          }
        );

        // Create only if doesn't exist
        if (existingRecord.length === 0) {
          await queryInterface.bulkInsert(table, [item], {});
          console.log(`Created ${item[uniqueField]} in ${table}`);
        } else {
          console.log(`${item[uniqueField]} already exists in ${table}`);
        }
      }
    }

    // Roles data
    const roles = [
      {
        name: 'QA',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Developer',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Levels data
    const levels = [
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
    ];

    // Check and create Roles
    await checkAndCreate('Roles', roles, 'name');

    // Check and create Levels
    await checkAndCreate('Levels', levels, 'name');

    // Users - keeping original implementation
    await queryInterface.bulkInsert("Users", [
      {
        name: "Admin",
        email: "X6qJt@example.com",
        password: "admin",
        role_id: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Delete users first
    await queryInterface.bulkDelete('Users', {
      email: ['X6qJt@example.com']
    }, {});

    // Delete levels
    await queryInterface.bulkDelete('Levels', null, {});

    // Delete roles
    await queryInterface.bulkDelete('Roles', {
      name: ['QA', 'Developer']
    }, {});
  }
};
