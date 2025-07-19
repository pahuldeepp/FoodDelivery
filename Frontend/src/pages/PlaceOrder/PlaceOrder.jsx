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

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    
    const orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          ...item,
          quantity: cartItems[item._id]
        });
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: total,
      userId: localStorage.getItem("userId")
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token }
      });

      if (response.data.success) {
        const { url: session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order.");
      }
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" name="firstName" placeholder='First Name' value={data.firstName} onChange={onChangeHandler} />
          <input type="text" name="lastName" placeholder='Last Name' value={data.lastName} onChange={onChangeHandler} />
        </div>
        <input type="email" name="email" placeholder='Email Address' value={data.email} onChange={onChangeHandler} />
        <input type="text" name="street" placeholder='Street' value={data.street} onChange={onChangeHandler} />
        <div className="multi-fields">
          <input type="text" name="city" placeholder='City' value={data.city} onChange={onChangeHandler} />
          <input type="text" name="state" placeholder='State' value={data.state} onChange={onChangeHandler} />
        </div>
        <div className="multi-fields">
          <input type="text" name="zipcode" placeholder='Zip Code' value={data.zipcode} onChange={onChangeHandler} />
          <input type="text" name="country" placeholder='Country' value={data.country} onChange={onChangeHandler} />
        </div>
        <input type="text" name="phone" placeholder='Phone' value={data.phone} onChange={onChangeHandler} />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${subtotal}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${deliveryFee}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${total}</b>
          </div>
          <button className="checkout-btn" onClick={handlePlaceOrder}>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
