const { Sequelize } = require('sequelize');
require('dotenv').config();

const user = process.env.USERNAME;
const host = process.env.HOST;
const database = process.env.DATABASE_NAME;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;

const db = new Sequelize(database, user, password, {
  host,
  port,
  dialect: 'postgres',
  logging: false,
});

module.exports = db;
