import dotenv from 'dotenv'
dotenv.config()

interface DBConfig {
  username: string | undefined
  password: string | undefined
  database: string | undefined
  host: string | undefined
  dialect: 'mysql'
  port: number
}

interface DBEnvironments {
  development: DBConfig
  test: DBConfig
  production: DBConfig
}

const config: DBEnvironments = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: Number(process.env.DB_PORT) || 3306
  },

  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: undefined,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: Number(process.env.DB_PORT) || 3306
  },

  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: undefined,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: Number(process.env.DB_PORT) || 3306
  }
}

export default config
