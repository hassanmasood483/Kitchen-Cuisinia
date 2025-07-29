import React, { useState, useEffect } from "react";
import "../pagesCSS/Orders.css";
import axios from "axios";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      console.log("Fetching orders from:", `${backendUrl}/order/all`);
      const response = await axios.get(`${backendUrl}/order/all`);
      console.log("Orders response:", response.data);
      if (response.data.success) {
        setOrders(response.data.orders);
        console.log("Orders set:", response.data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsComplete = async (orderId) => {
    try {
      const response = await axios.put(`${backendUrl}/order/update-status`, {
        orderId,
        status: "Delivered"
      });
      if (response.data.success) {
        fetchOrders(); // Refresh orders
      }
    } catch (error) {
      console.error("Error marking order as complete:", error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`${backendUrl}/order/update-status`, {
        orderId,
        status: newStatus
      });
      if (response.data.success) {
        fetchOrders(); // Refresh orders
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const deleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      try {
        const response = await axios.delete(`${backendUrl}/order/delete/${orderId}`);
        if (response.data.success) {
          fetchOrders(); // Refresh orders
        }
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Food Processing':
        return '#ffc107'; // Yellow for processing
      case 'Out for delivery':
        return '#007bff'; // Blue for out for delivery
      case 'Delivered':
        return '#28a745'; // Green for delivered
      case 'Cancelled':
        return '#dc3545'; // Red for cancelled
      default:
        return '#6c757d'; // Gray for default
    }
  };

  const getPaymentStatusColor = (paymentStatus) => {
    switch (paymentStatus) {
      case 'paid':
        return '#28a745'; // Green
      case 'pending':
        return '#dc3545'; // Red
      default:
        return '#6c757d'; // Gray
    }
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="orders-container">
      <h1>All Orders</h1>
      
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>No orders found</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order.orderId}</h3>
                  <p className="order-date">{formatDate(order.date)}</p>
                  <p className="customer-info">
                    Customer: {order.userId?.name || 'Unknown'} ({order.userId?.email || 'No email'})
                  </p>
                </div>
                <div className="order-status">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="order-details">
                <div className="order-items">
                  <h4>Items:</h4>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.name} x{item.quantity} - ${item.price * item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="order-summary">
                  <p><strong>Total Amount:</strong> ${order.amount}</p>
                  <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                  <p><strong>Payment Status:</strong> 
                    <span 
                      className="payment-status-badge"
                      style={{ 
                        backgroundColor: getPaymentStatusColor(order.paymentStatus),
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        marginLeft: '8px'
                      }}
                    >
                      {order.paymentStatus.toUpperCase()}
                    </span>
                  </p>
                </div>
                
                <div className="delivery-address">
                  <h4>Delivery Address:</h4>
                  <p>
                    {order.address.firstName} {order.address.lastName}<br />
                    {order.address.street}<br />
                    {order.address.city}, {order.address.state} {order.address.zipcode}<br />
                    {order.address.country}<br />
                    Phone: {order.address.phone}
                  </p>
                </div>
              </div>
              
              <div className="order-actions">
                {order.status !== "Delivered" && (
                  <div className="status-actions">
                    <button 
                      className="status-btn complete"
                      onClick={() => updateOrderStatus(order.orderId, "Delivered")}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                      Mark as Complete
                    </button>
                  </div>
                )}
                {order.status === "Delivered" && (
                  <span className="completed-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    Completed
                  </span>
                )}
                <button 
                  className="delete-btn"
                  onClick={() => deleteOrder(order._id)}
                  title="Delete Order"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}


    </div>
  );
};

export default Orders;
