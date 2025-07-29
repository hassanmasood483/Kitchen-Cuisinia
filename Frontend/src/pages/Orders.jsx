import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import "../pagesCSS/Orders.css";

const Orders = () => {
  const { token, url, loading: contextLoading } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url + "/order/user-orders", {
          headers: { token },
        });
        setOrders(response.data.orders || []);
      } catch (error) {
        setOrders([]);
      }
      setLoading(false);
    };
    if (token) fetchOrders();
  }, [token, url]);

  if (contextLoading || !token) return <div style={{textAlign: 'center', marginTop: '2rem'}}>Loading...</div>;
  if (loading) return <div style={{textAlign: 'center', marginTop: '2rem'}}>Loading your orders...</div>;

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-info"><b>Order ID:</b> {order.orderId}</div>
              <div className="order-info"><b>Amount:</b> <span className="order-amount">${order.amount}</span></div>
              <div className="order-info"><b>Payment Method:</b> {order.paymentMethod}</div>
              <div className="order-items">
                <b>Items:</b>
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>{item.name} x {item.quantity}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders; 