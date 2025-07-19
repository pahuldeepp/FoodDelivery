import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [url]);

  return (
    <div className="orders-page">
      <h2>All Orders (Admin Panel)</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>User ID:</strong> {order.userId}</p>
            <p><strong>Total Amount:</strong> ₹{order.amount.toFixed(2)}</p>
            <p><strong>Address:</strong> {Object.values(order.address).join(', ')}</p>
            <p>
              <strong>Payment Status:</strong>{" "}
              <span className={order.payment ? "paid" : "pending"}>
                {order.payment ? "Paid ✅" : "Pending ⏳"}
              </span>
            </p>
            <p><strong>Items:</strong></p>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>{item.name} x {item.quantity}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
