const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false } // If we don't use false:minimize then the cartdata will not be created because we don't provide any data to cartData here,   minimize:false will create cartData without any data
);

module.exports = userSchema;
