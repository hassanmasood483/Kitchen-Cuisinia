import React, { useState, useContext, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/placeOrder";
import OrderSuccess from "./pages/OrderSuccess";
import Footer from "./components/footer";
import LoginPopup from "./components/loginPopup";
import { StoreContext } from "./context/StoreContext";
import ViewMenu from "./components/viewMenu";
import CategoryPage from "./pages/CategoryPage";
import Orders from "./pages/Orders";

const App = () => {
  const { token, loading } = useContext(StoreContext);
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Show login if no token and not currently loading
    if (!token && !loading) {
      setShowLogin(true);
    } else if (token) {
      setShowLogin(false);
    }
  }, [token, loading]);

  // Intercept the View Menu button click on Home and navigate to /menu
  const handleViewMenuClick = () => {
    navigate("/menu");
  };

  // Show loading spinner while context is loading
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <>
      {showLogin ? (
        <LoginPopup setShowLogin={setShowLogin} />
      ) : (
        <div className="app">
          {location.pathname !== "/" && <Navbar setShowLogin={setShowLogin} />}
          <Routes>
            <Route path="/" element={<Home onViewMenuClick={handleViewMenuClick} />} />
            <Route path="/menu" element={<ViewMenu />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="place-order" element={<PlaceOrder />} />
            <Route path="order-success" element={<OrderSuccess />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
