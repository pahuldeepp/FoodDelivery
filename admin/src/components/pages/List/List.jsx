import React, { useState, useEffect } from 'react';
import "./List.css";
import axios from 'axios';
import { url } from '../../../assets/url';

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setList(response.data.data);
    } catch (error) {
      console.error("Failed to fetch list:", error);
    }
  };

  const removeFood = async (foodId) => {
    try {
      await axios.post(`${url}/api/food/remove`, { id: foodId }); // fixed 'id' key
      fetchList(); // refresh list
    } catch (error) {
      console.error("Failed to remove food:", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.length === 0 ? (
          <p style={{ padding: "20px", textAlign: "center" }}>No products found</p>
        ) : (
          list.map((item, index) => (
            <div key={index} className='list-table-format'>
              <img
                src={`${url}/images/${item.image}`}
                alt={item.name}
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">x</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default List;
