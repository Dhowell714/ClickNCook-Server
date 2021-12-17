const Sequelize = require('sequelize');


const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    // dialectOptions: {
    //     ssl: {
    //         require: true,
    //         rejectUnauthorized: false
    //     }
    // }
}
); 

//const sequelize = new Sequelize("postgres://postgres:Eleven$erver!@localhost:5432/click-n-cook");


module.exports = sequelize;
