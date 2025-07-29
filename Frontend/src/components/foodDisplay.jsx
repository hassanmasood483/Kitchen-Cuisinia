import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../assets/assets";
import "../componentCSS/foodDisplay.css";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const { url } = useContext(StoreContext);

  return (
    <>
      {/* Food display section removed */}
    </>
  );
};

export default FoodDisplay;
