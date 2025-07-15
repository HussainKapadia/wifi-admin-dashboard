module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('connected_devices', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      device_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ip_address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mac_address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      connection_type: {
        type: Sequelize.ENUM('Wireless', 'Wired'),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        )
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('connected_devices')
  }
}
