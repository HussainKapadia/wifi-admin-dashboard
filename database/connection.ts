import { Sequelize } from 'sequelize'
import config from './config/config'
import Module from 'module'
import mysql2 from 'mysql2'

const env = process.env.NODE_ENV || 'development'
const dbConfig = config[env]

const sequelize = new Sequelize(
  dbConfig.database as string,
  dbConfig.username as string,
  dbConfig.password as string,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    dialectModule: mysql2,
    port: dbConfig.port
  }
)

export default sequelize
