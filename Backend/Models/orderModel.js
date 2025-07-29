// creating this order model where we store the orders which are done

const moongose = require("mongoose");

const orderSchema = require("../Schema/orderModel");

const orderModel =
  moongose.models.order || moongose.model("order", orderSchema);

module.exports = orderModel;
