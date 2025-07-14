import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");

  return (
    <div className='login-popup'>
      <form
        className="login-popup-container"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close login popup"
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              name="name"
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        <p>
          {currState === "Sign Up"
            ? "Already have an account?"
            : "Don't have an account?"}{' '}
          <span
            className="login-popup-toggle"
            onClick={() =>
              setCurrState(currState === "Sign Up" ? "Login" : "Sign Up")
            }
          >
            {currState === "Sign Up" ? "Login here" : "Sign up here"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
