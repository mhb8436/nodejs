'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {    
   //  npx sequelize-cli db:seed:all
   const result = await queryInterface.bulkInsert('users', [{
        email: 'c@gmail.com',
        password: 'test1234',
        name: 'c_admin',
        address: 'seoul',    
        createdAt: new Date(),
        updatedAt: new Date(),
    }, {
        email: 'd@gmail.com',
        password: 'test1234',
        name: 'd_admin',
        address: 'busan',     
        createdAt: new Date(),
        updatedAt: new Date(),
    }]);
    console.log(result);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
