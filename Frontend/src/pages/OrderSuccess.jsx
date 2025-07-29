import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../pagesCSS/OrderSuccess.css";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentOrder, setRecentOrder] = useState(null);
  const { setCartItems, token, url } = useContext(StoreContext);

  const orderId = searchParams.get("orderId");
  const paymentMethod = searchParams.get("paymentMethod");

  useEffect(() => {
    if (orderId) {
      setOrderDetails({
        orderId: orderId,
        paymentMethod: paymentMethod,
        status: "confirmed"
      });
      setCartItems({});
      // Fetch the most recent order details
      if (token) {
        axios.get(url + "/order/user-orders", { headers: { token } })
          .then(res => {
            if (res.data.orders && res.data.orders.length > 0) {
              setRecentOrder(res.data.orders[0]); // assuming sorted by date desc
            }
          });
      }
    }
    setLoading(false);
  }, [orderId, paymentMethod, setCartItems, token, url]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="order-success">
      <div className="success-container">
        <div className="success-icon">✅</div>
        <h1>Order Placed Successfully!</h1>
        <p className="order-id">Order ID: <b>{orderId}</b></p>
        {recentOrder && (
          <div className="order-summary">
            <div className="order-info"><b>Order ID:</b> {recentOrder.orderId}</div>
            <div className="order-info"><b>Amount:</b> <span className="order-amount">${recentOrder.amount}</span></div>
            <div className="order-info"><b>Payment Method:</b> {recentOrder.paymentMethod}</div>
            <div className="order-items">
              <b>Items:</b>
              <ul>
                {recentOrder.items.map((item, idx) => (
                  <li key={idx}>{item.name} x {item.quantity}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {paymentMethod === 'cod' ? (
          <div className="cod-info">
            <h2>Cash on Delivery</h2>
            <p>Your order has been confirmed. Please pay the amount when your order is delivered.</p>
            <div className="delivery-info">
              <h3>What's Next?</h3>
              <ul>
                <li>We'll start preparing your order</li>
                <li>You'll receive a confirmation call</li>
                <li>Your order will be delivered within 30-45 minutes</li>
                <li>Pay the total amount to the delivery person</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="online-payment-info">
            <h2>Online Payment</h2>
            <p>Your payment is being processed. You'll receive a confirmation once the payment is completed.</p>
          </div>
        )}
        <div className="action-buttons">
          <button 
            className="primary-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess; 