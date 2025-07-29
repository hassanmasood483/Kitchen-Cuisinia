import React, { useState } from "react";
import Header from "../components/header";
import "../pagesCSS/Home.css";
// import Footer from "../components/footer";

const Home = ({ onViewMenuClick }) => {
  const [menuClicked, setMenuClicked] = useState(false);

  return (
    <>
      {!menuClicked && <Header onViewMenuClick={onViewMenuClick} />}
      {/* <Footer /> Removed */}
    </>
  );
};

export default Home;
