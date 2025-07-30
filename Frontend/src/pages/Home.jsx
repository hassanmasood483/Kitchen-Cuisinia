import React, { useState } from "react";
import Header from "../components/header";
import Navbar from "../components/Navbar"; // Add this line
import "../pagesCSS/Home.css";
// import Footer from "../components/footer";

const Home = ({ onViewMenuClick, setShowLogin }) => {
  // Add setShowLogin prop
  const [menuClicked, setMenuClicked] = useState(false);

  return (
    <>
      <Navbar setShowLogin={setShowLogin} /> {/* Add Navbar here */}
      {!menuClicked && <Header onViewMenuClick={onViewMenuClick} />}
      {/* <Footer /> Removed */}
    </>
  );
};
export default Home;