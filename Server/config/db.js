const Sequelize = require("sequelize");
// const env = "lab";
const env = "";
let ip = "192.168.123.50";
// const
let dbname = "chengfeng1_5";
let password = "hanson";
if (!env) {
  ip = "47.95.123.147";
  dbname = "cshop";
  password = "fang19970312";
}

const sequelize = new Sequelize(dbname, "hanson", password, {
  host: ip,
  dialect: "mysql",
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
  timezone: "+08:00" //东八时区
});

module.exports = sequelize;
