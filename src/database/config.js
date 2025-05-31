require('dotenv').config()

module.exports = {
  development: {
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'senha123',
    database: process.env.POSTGRES_DB || 'host_ape_db',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5434,
    dialect: 'postgres',
  },
};
