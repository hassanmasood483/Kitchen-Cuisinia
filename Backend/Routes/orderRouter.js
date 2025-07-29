const router = require("express").Router();
const authMiddleWare = require("../MiddleWare/auth");
const { placeOrder, getOrderStatus, getUserOrders, getAllOrders, updateOrderStatus, deleteOrder } = require("../Controllers/orderController");

router.post("/place", authMiddleWare, placeOrder);
router.get("/status/:orderId", getOrderStatus);
router.get("/user-orders", authMiddleWare, getUserOrders);
router.get("/all", getAllOrders);
router.put("/update-status", updateOrderStatus);
router.delete("/delete/:orderId", deleteOrder);

module.exports = router;
