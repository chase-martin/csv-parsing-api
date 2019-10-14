const mongoose = require('mongoose');
const mongoConfig = require('./mongo-config');

//const mongoDB = `mongodb://localhost:27017/cars`;
const mongoDB = `mongodb://${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.dbName}`;
mongoose.createConnection(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true  });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Schema = mongoose.Schema;
const carsSchema = new Schema({
  csv: String
});
const Car = mongoose.model('Car', carsSchema, { strict: false });

module.export = Car;