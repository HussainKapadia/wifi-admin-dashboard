module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert a default network info for user_id 1
    await queryInterface.bulkInsert('network_infos', [
      {
        user_id: 1,
        ssid: 'Home_Network',
        security_type: 'WPA2',
        channel: 6,
        frequency: '2.4GHz',
        ip_address: '192.168.1.1',
        subnet_mask: '255.255.255.0',
        gateway: '192.168.1.1',
        dns: '8.8.8.8,8.8.4.4'
      }
    ])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('network_infos', { user_id: 1 }, {})
  }
}
