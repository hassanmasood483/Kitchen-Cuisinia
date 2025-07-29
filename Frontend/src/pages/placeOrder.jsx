import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import "../pagesCSS/placeOrder.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, cartItems, url, loading, food_list } = useContext(StoreContext);
  const navigate = useNavigate();

  //create state to handle the form data for placing order
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);

  //onChangeHandler function to save the form data into this state variable
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // for clicking submit button function
  const placeholder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      //now we call our API
      let orderItems = [];
      food_list.map((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = { ...item };
          itemInfo["quantity"] = cartItems[item._id];
          orderItems.push(itemInfo);
        }
      });
      
      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 2,
        paymentMethod: paymentMethod,
      };
      
      //we send our data through API
      let response = await axios.post(url + "/order/place/", orderData, {
        headers: { token },
      });

      //when response is success then handle based on payment method
      if (response.data.success) {
        if (paymentMethod === 'cod') {
          // For COD, redirect to success page
          navigate(`/order-success?orderId=${response.data.orderId}&paymentMethod=cod`);
        } else {
          // For online payments, redirect to payment gateway
          window.location.href = response.data.redirectUrl;
        }
      } else {
        alert("Error placing order");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      alert("Error placing order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</div>
      ) : (
        <form onSubmit={placeholder} className="place-order">
          <div className="order-left">
            <p>Delivery Information</p>

            <div className="multi-fields">
              <input
                required
                name="firstName"
                onChange={onChangeHandler}
                value={data.firstName}
                type="text"
                placeholder="First name"
              />
              <input
                required
                name="lastName"
                onChange={onChangeHandler}
                value={data.lastName}
                type="text"
                placeholder="Last name"
              />
            </div>

            <input
              required
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Email address"
            />
            <input
              required
              name="street"
              onChange={onChangeHandler}
              value={data.street}
              type="text"
              placeholder="street"
            />

            <div className="multi-fields">
              <input
                required
                name="city"
                onChange={onChangeHandler}
                value={data.city}
                type="text"
                placeholder="City"
              />
              <input
                required
                name="state"
                onChange={onChangeHandler}
                value={data.state}
                type="text"
                placeholder="State"
              />
            </div>

            <div className="multi-fields">
              <input
                required
                name="zipcode"
                onChange={onChangeHandler}
                value={data.zipcode}
                type="text"
                placeholder="Zip code"
              />
              <input
                required
                name="country"
                onChange={onChangeHandler}
                value={data.country}
                type="text"
                placeholder="Country"
              />
            </div>

            <input
              required
              name="phone"
              onChange={onChangeHandler}
              value={data.phone}
              type="text"
              placeholder="phone"
            />

            {/* Payment Method Selection */}
            <div className="payment-methods">
              <p>Payment Method</p>
              <div className="payment-options">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Cash on Delivery (COD)</span>
                </label>
              </div>
              <p className="payment-note">
                Pay the total amount when your order is delivered
              </p>
            </div>
          </div>

          <div className="order-right">
            <div className="cart-total">
              <h2>Cart Total</h2>
              <div>
                <div className="total-details">
                  <p>Sub Total</p>
                  <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="total-details">
                  <p>Delivery Fee</p>
                  <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                </div>
                <hr />
                <div className="total-details">
                  <b>Total</b>
                  <b>
                    ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                  </b>
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting || getTotalCartAmount() === 0}
                className={isSubmitting ? "submitting" : ""}
              >
                {isSubmitting ? "Processing..." : "PLACE ORDER"}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default PlaceOrder;
