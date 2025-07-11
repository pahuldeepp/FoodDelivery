import React from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore Our Menu</h1>
      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to bring you fresh,
        flavorful meals crafted with the finest ingredients to satisfy every craving.
      </p>

      <div className='explore-menu-list'>
        {menu_list.map((item, index) => (
          <div  onClick={()=>setCategory(prev=>prev===item.menu_name?"All": item.menu_name)} key={index} className='explore-menu-list-item'>
            <img className={category===item.menu_name?"active":""} src={item.menu_image} alt={item.menu_name} />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr/>
    </div>
  );
};

export default ExploreMenu;
