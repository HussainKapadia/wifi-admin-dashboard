import { DataTypes, Model } from 'sequelize'
import connection from '../connection'

class NetworkInfo extends Model {}

NetworkInfo.init(
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
        model: 'users',
        key: 'id'
      }
    },
    ssid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    security_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    channel: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    frequency: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ip_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subnet_mask: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gateway: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dns: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        // Return as array if comma separated
        const raw = this.getDataValue('dns')
        return raw ? raw.split(',').map((s: string) => s.trim()) : []
      },
      set(val: string[] | string) {
        this.setDataValue('dns', Array.isArray(val) ? val.join(',') : val)
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize: connection,
    modelName: 'NetworkInfo',
    tableName: 'network_infos',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

export default NetworkInfo
