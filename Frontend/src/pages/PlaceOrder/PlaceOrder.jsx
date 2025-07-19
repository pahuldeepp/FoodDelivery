import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const subtotal = getTotalCartAmount();
  const deliveryFee = 2;
  const total = subtotal + deliveryFee;

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please sign in to place an order.");
      return;
    }

    const orderItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        ...item,
        quantity: cartItems[item._id],
      }));

    if (orderItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderData = {
      address: data,
      items: orderItems,
      amount: total,
      userId: localStorage.getItem("userId"),
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success && response.data.url) {
        window.location.replace(response.data.url);
      } else {
        alert("Order failed. Try again.");
      }
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" name="firstName" placeholder="First Name" value={data.firstName} onChange={onChangeHandler} />
          <input type="text" name="lastName" placeholder="Last Name" value={data.lastName} onChange={onChangeHandler} />
        </div>
        <input type="email" name="email" placeholder="Email Address" value={data.email} onChange={onChangeHandler} />
        <input type="text" name="street" placeholder="Street" value={data.street} onChange={onChangeHandler} />
        <div className="multi-fields">
          <input type="text" name="city" placeholder="City" value={data.city} onChange={onChangeHandler} />
          <input type="text" name="state" placeholder="State" value={data.state} onChange={onChangeHandler} />
        </div>
        <div className="multi-fields">
          <input type="text" name="zipcode" placeholder="Zip Code" value={data.zipcode} onChange={onChangeHandler} />
          <input type="text" name="country" placeholder="Country" value={data.country} onChange={onChangeHandler} />
        </div>
        <input type="text" name="phone" placeholder="Phone" value={data.phone} onChange={onChangeHandler} />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${deliveryFee.toFixed(2)}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${total.toFixed(2)}</b>
          </div>
          <button className="checkout-btn" onClick={handlePlaceOrder}>
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
