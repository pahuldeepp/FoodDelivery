import React, { useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      if (success === "true" && orderId) {
        try {
          const response = await axios.post(`${url}/api/order/verify`, { orderId });
          if (response.data.success) {
            console.log("Payment verified with backend");
            navigate("/myorders");
          } else {
            console.warn("Payment verification failed");
            navigate("/");
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          navigate("/");
        }
      } else {
        navigate("/");
      }
    };

    verifyPayment();
  }, [success, orderId, url, navigate]);

  return (
    <div className="verify">
      {success === "true" ? (
        <div>
          <h2>Payment Successful!</h2>
          <p>Your order has been placed successfully.</p>
          <p>Order ID: <strong>{orderId}</strong></p>
        </div>
      ) : (
        <div>
          <h2>Payment Failed or Canceled</h2>
          <p>We couldn’t process your payment. Please try again.</p>
        </div>
      )}
    </div>
  );
};

export default Verify;
