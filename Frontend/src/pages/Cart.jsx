import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import "../pagesCSS/Cart.css";

import React, { useContext } from "react";

const Cart = () => {
  const { cartItems, removeFromCart, food_list, url } = useContext(StoreContext);

  const navigate = useNavigate();

  // Check if cart is empty
  const cartItemCount = Object.values(cartItems).reduce((sum, qty) => sum + (qty > 0 ? qty : 0), 0);

  // Calculate subtotal
  const subtotal = food_list.reduce((sum, item) => sum + (cartItems[item._id] > 0 ? item.price * cartItems[item._id] : 0), 0);
  const deliveryFee = subtotal > 0 ? 5 : 0;
  const total = subtotal + deliveryFee;

  return (
    <>
      <div className="cart">
        <div className="cart-items">
          <div className="items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {cartItemCount === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <button onClick={() => navigate("/menu")}>Browse Menu</button>
            </div>
          ) : (
            food_list.map((item, index) => {
              if (cartItems[item._id] > 0) {
                return (
                  <React.Fragment key={item._id}>
                    <div className="items-title cart-item">
                      <img src={`${url}/images/${item.image}`} alt={item.name} />
                      <p>{item.name}</p>
                      <p>${item.price}</p>
                      <p>{cartItems[item._id]}</p>
                      <p>${item.price * cartItems[item._id]}</p>
                      <p
                        onClick={() => removeFromCart(item._id)}
                        className="cross"
                      >
                        x
                      </p>
                    </div>
                    <hr />
                  </React.Fragment>
                );
              }
              return null;
            })
          )}
        </div>

        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="total-details">
                <p>Sub Total</p>
                <p>${subtotal}</p>
              </div>
              <hr />
              <div className="total-details">
                <p>Delivery Fee</p>
                <p>${deliveryFee}</p>
              </div>
              <hr />
              <div className="total-details">
                <b>Total</b>
                <b>${total}</b>
              </div>
            </div>
            <button 
              onClick={() => navigate("/place-order")}
              disabled={cartItemCount === 0}
              className={cartItemCount === 0 ? "disabled" : ""}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
