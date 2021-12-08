const Sequelize = require('sequelize');

const sequelize = new Sequelize(`postgres://postgres:${encodeURIComponent(process.env.PASS)}@localhost:5432/click-n-cook`,
{
    dialect: 'postgres'
}
);

module.exports = sequelize;
