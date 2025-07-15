import { DataTypes, Model } from 'sequelize'
import connection from '../connection'

class ConnectedDevice extends Model {}

ConnectedDevice.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    device_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ip_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mac_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    connection_type: {
      type: DataTypes.ENUM('Wireless', 'Wired'),
      allowNull: false
    }
  },
  {
    sequelize: connection,
    modelName: 'ConnectedDevice',
    tableName: 'connected_devices',
    timestamps: true
  }
)

export default ConnectedDevice
