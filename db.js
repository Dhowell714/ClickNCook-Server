const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:YourPassword@localhost:5432/click-n-cook");

module.exports = sequelize;
