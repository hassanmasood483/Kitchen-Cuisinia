const orderModel = require("../Models/orderModel");
const userModel = require("../Models/usermodel");
require("dotenv").config();

// Generate unique order ID
const generateOrderId = () => {
  const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
  const random = Math.random().toString(36).substring(2, 5).toUpperCase(); // 3 random characters
  return `ORD${timestamp}${random}`;
};

//placing user order for frontend
module.exports = {
  placeOrder: async (req, res) => {
    const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";
    try {
      const { paymentMethod } = req.body;
      
      // For now, only COD is supported
      if (paymentMethod !== 'cod') {
        return res.status(400).send({
          success: false,
          message: "Only Cash on Delivery (COD) is currently supported",
        });
      }

      // Generate unique order ID
      const orderId = generateOrderId();

      // Create new order
      const newOrder = new orderModel({
        userId: req.body.userId,
        items: req.body.items,
        amount: req.body.amount,
        address: req.body.address,
        paymentMethod: 'cod',
        orderId: orderId,
        payment: false, // Will be marked as paid when delivered
        paymentStatus: 'pending'
      });

      await newOrder.save();

      // Clear cart after successful order
      await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

      // Return success response for COD
      return res.send({
        success: true,
        message: "Order placed successfully! Pay on delivery.",
        orderId: orderId,
        redirectUrl: `${frontend_url}/order-success?orderId=${orderId}&paymentMethod=cod`
      });

    } catch (error) {
      console.log(error);
      return res.send({
        success: false,
        message: "Error placing order",
      });
    }
  },

  // Get order status
  getOrderStatus: async (req, res) => {
    try {
      const { orderId } = req.params;
      const order = await orderModel.findOne({ orderId: orderId });
      
      if (!order) {
        return res.status(404).send({
          success: false,
          message: "Order not found"
        });
      }

      res.send({
        success: true,
        order: order
      });
    } catch (error) {
      console.log(error);
      res.send({
        success: false,
        message: "Error fetching order status"
      });
    }
  },

  // Get all orders for the authenticated user
  getUserOrders: async (req, res) => {
    try {
      const userId = req.body.userId;
      if (!userId) {
        return res.status(401).send({ success: false, message: "User not authenticated" });
      }
      const orders = await orderModel.find({ userId }).sort({ date: -1 });
      res.send({ success: true, orders });
    } catch (error) {
      console.log(error);
      res.send({ success: false, message: "Error fetching user orders" });
    }
  },

  // Get all orders for admin panel
  getAllOrders: async (req, res) => {
    try {
      const orders = await orderModel.find({}).sort({ date: -1 });
      
      // Get user details for each order
      const ordersWithUserDetails = await Promise.all(
        orders.map(async (order) => {
          try {
            const user = await userModel.findById(order.userId);
            return {
              ...order.toObject(),
              userId: user ? { name: user.name, email: user.email } : null
            };
          } catch (error) {
            return {
              ...order.toObject(),
              userId: null
            };
          }
        })
      );
      
      res.send({ success: true, orders: ordersWithUserDetails });
    } catch (error) {
      console.log(error);
      res.send({ success: false, message: "Error fetching all orders" });
    }
  },

  // Update order status (for admin)
  updateOrderStatus: async (req, res) => {
    try {
      const { orderId, status } = req.body;
      
      // Determine payment status based on order status
      let paymentStatus = 'pending';
      let payment = false;
      
      if (status === 'Delivered') {
        paymentStatus = 'paid';
        payment = true;
      } else if (status === 'Food Processing') {
        paymentStatus = 'pending';
        payment = false;
      }
      
      const order = await orderModel.findOneAndUpdate(
        { orderId: orderId },
        { 
          status: status,
          paymentStatus: paymentStatus,
          payment: payment
        },
        { new: true }
      );
      
      if (!order) {
        return res.status(404).send({ success: false, message: "Order not found" });
      }
      
      res.send({ success: true, order });
    } catch (error) {
      console.log(error);
      res.send({ success: false, message: "Error updating order status" });
    }
  },

  // Delete order (for admin)
  deleteOrder: async (req, res) => {
    try {
      const { orderId } = req.params;
      // Try to delete by _id first, then by orderId for backward compatibility
      let order = await orderModel.findByIdAndDelete(orderId);
      if (!order) {
        order = await orderModel.findOneAndDelete({ orderId: orderId });
      }
      if (!order) {
        return res.status(404).send({ success: false, message: "Order not found" });
      }
      res.send({ success: true, message: "Order deleted successfully" });
    } catch (error) {
      console.log(error);
      res.send({ success: false, message: "Error deleting order" });
    }
  }
};
