import React from 'react';
import "./Header.css";

const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Choose from a diverse menu and enjoy delicious meals delivered right to your door.
        </p>
        <button>
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
