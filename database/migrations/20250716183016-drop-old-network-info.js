module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop the old table if it exists
    await queryInterface.dropTable('network_info')
  },
  down: async (queryInterface, Sequelize) => {
    // Optionally, recreate the old table (structure unknown, so leaving empty)
    // await queryInterface.createTable('network_info', {/* ... */});
  }
}
