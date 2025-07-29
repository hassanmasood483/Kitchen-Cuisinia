const { mongoose } = require("mongoose");
const userSchema = require("../Schema/userSchema");

const userModel = mongoose.model.user || mongoose.model("user", userSchema);

module.exports = userModel;
