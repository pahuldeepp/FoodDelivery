import React, { createContext, useState } from 'react';
import { food_list } from '../assets/assets'; // ✅ Make sure this path is correct

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [foods, setFoods] = useState(food_list); // ✅ loaded from your assets

  const contextValue = {
    food_list: foods, // ✅ this gets passed to context
    setFoods,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
