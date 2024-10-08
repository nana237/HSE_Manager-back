const Sequelize = require('@sequelize/core');

const sequelize = new Sequelize({
  dialect: 'postgres',
  database: 'hse',
  user: 'user',
  password: '1234',
  host: 'localhost',
  port: 5432,
  clientMinMessages: 'notice',
});

module.exports = sequelize;

