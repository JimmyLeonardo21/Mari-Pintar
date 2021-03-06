'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const fs = require('fs')
     let data = JSON.parse(fs.readFileSync('./data/courses.json', 'utf-8'))
     data.forEach(el => {
       el.createdAt = new Date()
       el.updatedAt = new Date()
     });
    return queryInterface.bulkInsert('Courses', data, {})
  },

  down:  (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Courses', null, {})
  }
};
