module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('network_infos', {
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
      ssid: {
        type: Sequelize.STRING,
        allowNull: false
      },
      security_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      channel: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      frequency: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ip_address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      subnet_mask: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gateway: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dns: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('network_infos')
  }
}
