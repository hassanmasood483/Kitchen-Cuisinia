import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

const StoreContext = createContext(null);

// Add a global axios response interceptor for 401 Unauthorized
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      // Optionally, you can also clear other user data here
      window.location.reload(); // Force reload to show login
    }
    return Promise.reject(error);
  }
);

const StoreContextProvidor = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const [token, setToken] = useState("");

  //We want to set our products which we fetch through API's from backend
  const [food_list, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true); // <-- Add loading state

  //Function to fetch data from database regarding food products, here we call the API for get all food product
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/food/food-list");
      if (response.data.success) {
        setFoodList(response.data.data);
      } else {
        console.error("Failed to fetch food list:", response.data.message);
        setFoodList([]);
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
      setFoodList([]);
    }
  };

  // Function to refresh food list (can be called when new items are added)
  const refreshFoodList = useCallback(async () => {
    await fetchFoodList();
  }, [url]);

  // Function to manually load user data after successful login
  const loadUserData = async (userToken) => {
    try {
      setToken(userToken);
      localStorage.setItem("token", userToken);
      await loadCartData(userToken);
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  // we want that when we refresh the page we will not get logged out
  useEffect(() => {
    async function loadData() {
      setLoading(true); // <-- Start loading
      try {
        //We want that this function runs when web-page is load and data is fetch from database
        await fetchFoodList();
        
        // Check if there's a stored token and load user data
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken);
          await loadCartData(storedToken);
        }
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        setLoading(false); // <-- End loading
      }
    }
    loadData(); //here we call the function which fetch data
  }, []);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    // checking that token is available or not
    if (token) {
      await axios.post(url + "/cart/add", { itemId }, { headers: { token } }); //whenever we login and add some data in cart it will also update in the database
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    //if any item remove by user, we remove it from database
    // if request have toke this means user is logged in
    if (token) {
      await axios.post(
        url + "/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  //we want that when user add some items in cart it will show whenever user visited application So,
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "/cart/get",
        {},
        { headers: { token } }
      ); //we get one response in which we get the logged in user only data based on its token

      if (response.data.success) {
        setCartItems(response.data.cartData); // our cart data is loaded in this state, we want that this cart data is loaded whenever user is logged in that's why we call it in useEffect hook
      } else {
        console.error("Failed to load cart data:", response.data.message);
        setCartItems({});
      }
    } catch (error) {
      console.error("Error loading cart data:", error);
      setCartItems({});
    }
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        let itemInfo = food_list.find((product) => product._id === itemId);
        if (itemInfo) {
          // Check if itemInfo is not undefined
          totalAmount += itemInfo.price * cartItems[itemId];
        }
      }
    }
    return totalAmount;
  };

  const storeContextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    refreshFoodList, // <-- Expose refresh function
    url,
    token,
    setToken,
    loading, // <-- Expose loading state
    loadUserData, // <-- Expose loadUserData function
  };

  return (
    <>
      <StoreContext.Provider value={storeContextValue}>
        {props.children}
      </StoreContext.Provider>
    </>
  );
};

export { StoreContextProvidor, StoreContext };
