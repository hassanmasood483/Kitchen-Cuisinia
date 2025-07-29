const mongoose = require("mongoose");
const foodSchema = require("../Schema/foodModel");

const foodModel = mongoose.model.food || mongoose.model("food", foodSchema);

module.exports = foodModel;
