const moongose = require("mongoose");

const orderSchema = new moongose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Food Processing" },
  date: { type: Date, default: Date.now() },
  payment: { type: Boolean, default: false },
  paymentMethod: { type: String, required: true, default: 'cod', enum: ['cod'] },
  paymentStatus: { type: String, default: 'pending', enum: ['pending', 'completed', 'failed'] },
  orderId: { type: String, unique: true },
});

module.exports = orderSchema;
