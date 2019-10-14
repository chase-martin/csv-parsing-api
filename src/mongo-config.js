require('dotenv').config();

const mongoConfig = {
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_PORT,
  dbName: process.env.MONGO_DB_NAME,
};

module.exports = mongoConfig;
