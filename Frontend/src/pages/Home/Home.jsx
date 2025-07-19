import React, { useState } from 'react';
import "./Home.css";
import Header from '../../components/Headers/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';

const Home = () => {
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState(""); // 👈 Add this line

  return (
    <div>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> {/* 👈 Pass props */}
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} searchQuery={searchQuery} /> {/* 👈 Pass search */}
      <AppDownload />
    </div>
  );
};

export default Home;
