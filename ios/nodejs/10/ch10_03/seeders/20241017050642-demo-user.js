"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "John1",
        email: "john1@gmail.com",
        password: "admin1234",
        address: "seoul, korea",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "John2",
        email: "john2@gmail.com",
        password: "admin1234",
        address: "seoul, korea",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "John3",
        email: "john3@gmail.com",
        password: "admin1234",
        address: "seoul, korea",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
