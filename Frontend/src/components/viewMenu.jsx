import "../componentCSS/viewMenu.css";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../assets/assets";

const ViewMenu = () => {
  const navigate = useNavigate();
  const { food_list, refreshFoodList } = useContext(StoreContext);

  // Refresh food list when component mounts
  useEffect(() => {
    refreshFoodList();
  }, [refreshFoodList]);

  // Get unique categories from food_list
  const categories = Array.from(new Set(food_list.map(food => food.category)));

  // Menu images array
  const menuImages = [
    assets.menu_1,
    assets.menu_2,
    assets.menu_3,
    assets.menu_4,
    assets.menu_5,
    assets.menu_6,
    assets.menu_7,
    assets.menu_8,
  ];

  // For each category, assign a menu image
  const categoryData = categories.map((category, index) => {
    return {
      menu_name: category,
      menu_image: menuImages[index % menuImages.length], // Cycle through menu images
    };
  });

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  // Function to get first letter of category for placeholder
  const getCategoryInitial = (categoryName) => {
    return categoryName ? categoryName.charAt(0).toUpperCase() : '?';
  };

  return (
    <div className="menu-glass-bg">
      <h1 className="menu-title">Top List</h1>
      <p className="menu-subtitle">Our mainstay menu</p>
      <div className="menu-card-list">
        {categoryData.map((item, index) => (
          <div
            key={index}
            className="menu-card-glass"
            onClick={() => handleCategoryClick(item.menu_name)}
          >
            <div className="menu-card-img-wrap">
              {item.menu_image ? (
                <img src={item.menu_image} alt={item.menu_name} className="menu-card-img" />
              ) : (
                <div className="menu-card-img-placeholder">
                  {getCategoryInitial(item.menu_name)}
                </div>
              )}
            </div>
            <div className="menu-card-content">
              <h2 className="menu-card-title">{item.menu_name}</h2>
              <p className="menu-card-desc">Delicious {item.menu_name.toLowerCase()} options for every taste.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewMenu;
