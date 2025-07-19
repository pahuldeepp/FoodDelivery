import React, { useState, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt='logo' className='logo' /></Link>

      <ul className="navbar-menu">
        <li>
          <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        </li>
        <li>
          <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        </li>
        <li>
          <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        </li>
        <li>
          <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
        </li>
      </ul>

      <div className='navbar-right'>
        <img src={assets.search_icon} alt='search' />

        <div className='navbar-search-icon'>
          <Link to='/cart'>
            <img src={assets.basket_icon} alt='cart' />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="profile" />
            <ul className="nav-profile-dropdown">
              <Link to="/myorders">
                <li onClick={() => setMenu("orders")}>
                  <img src={assets.bag_icon} alt="Orders" />
                  <span>Orders</span>
                </li>
              </Link>
              <hr />
              <li onClick={handleLogout}>
                <img src={assets.logout_icon} alt="Logout" />
                <span>Logout</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
