import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import "../pagesCSS/CategoryPage.css";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { addToCart, removeFromCart, cartItems, food_list, url, refreshFoodList } = useContext(StoreContext);
  const selectedCategory = categoryName;

  // Refresh food list when component mounts or category changes
  useEffect(() => {
    refreshFoodList();
    // eslint-disable-next-line
  }, [categoryName]);

  // Filter foods by category (show all, not just 3)
  const categoryFoods = food_list.filter(food => food.category === selectedCategory);

  const getFoodItemCount = (foodId) => {
    return cartItems[foodId] || 0;
  };

  return (
    <div className="category-page">
      <div className="category-header">
        <button className="back-button" onClick={() => navigate("/menu")}>← Back to Menu</button>
        <h1>{selectedCategory}</h1>
        <p>Delicious {selectedCategory.toLowerCase()} options for every taste</p>
      </div>
      <div className="food-grid">
        {categoryFoods.map((food) => {
          const itemCount = getFoodItemCount(food._id);
          const imageUrl = `${url}/images/${food.image}`;
          return (
            <div key={food._id} className="food-card" style={{backgroundImage: `url(${imageUrl})`}}>
              {/* Additional img element to ensure proper image loading */}
              <img 
                src={imageUrl} 
                alt={food.name}
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  zIndex: 1,
                  opacity: 0.8
                }}
              />
              {/* Frosted Glass Blur Overlay at Bottom */}
              <div className="card-blur-overlay">
                <div className="card-blur-content">
                  <h3 className="food-name">{food.name}</h3>
                  <p className="food-description">{food.description}</p>
                  <div className="food-actions">
                    {itemCount === 0 ? (
                      <button
                        className="add-to-cart-btn"
                        onClick={() => addToCart(food._id)}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn remove"
                          onClick={() => removeFromCart(food._id)}
                        >
                          -
                        </button>
                        <span className="quantity">{itemCount}</span>
                        <button
                          className="quantity-btn add"
                          onClick={() => addToCart(food._id)}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPage; 