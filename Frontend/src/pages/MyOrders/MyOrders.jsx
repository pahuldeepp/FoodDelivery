import React, { useState, useEffect, useContext } from 'react';
import './MyOrders.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      const orderData = response.data.data || [];
      setOrders(orderData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <img src={assets.parcel_icon} alt="Parcel Icon" className="parcel-icon" />

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total Amount:</strong> ₹{order.amount.toFixed(2)}</p>
            <p><strong>Delivery Address:</strong></p>
            <ul className="order-address">
              <li>{order.address.firstName} {order.address.lastName}</li>
              <li>{order.address.street}</li>
              <li>{order.address.city}, {order.address.state} {order.address.zipcode}</li>
              <li>{order.address.country}</li>
              <li>Phone: {order.address.phone}</li>
            </ul>
            <p>
              <strong>Payment Status:</strong>{" "}
              <span className={order.payment ? "paid" : "pending"}>
                {order.payment ? "Paid ✅" : "Pending ⏳"}
              </span>
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
