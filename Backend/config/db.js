const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
  await mongoose
    .connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/food-ordering')
    .then(() => {
      console.log("DB Connected");
    });
};

module.exports = connectDB;
