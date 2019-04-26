const Sequelize=require("sequelize")
const sequelize=new Sequelize("cshop","hanson","fang19970312",{
    host:"47.95.123.147",
    dialect:"mysql",
    operatorsAliases: false,
    dialectOptions: {
        charset: "utf8mb4",
        supportBigNumbers: true,
        bigNumberStrings: true
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00' //东八时区
})

module.exports=sequelize;