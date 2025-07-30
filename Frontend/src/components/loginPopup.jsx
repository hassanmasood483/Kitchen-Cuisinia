import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import "../componentCSS/loginPopup.css";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  // It's in context API so we can use it anywhere in application
  const { url, loadUserData } = useContext(StoreContext);

  const [currentState, setCurrentState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetStep, setResetStep] = useState(0); // 0: enter email, 1: set new password
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8)
      return "Password must be at least 8 characters long";
    if (!/(?=.*[a-z])/.test(password))
      return "Password must contain at least one lowercase letter";
    if (!/(?=.*[A-Z])/.test(password))
      return "Password must contain at least one uppercase letter";
    if (!/(?=.*\d)/.test(password))
      return "Password must contain at least one number";
    if (!/(?=.[!@#$%^&(),.?":{}|<>])/.test(password))
      return "Password must contain at least one special character";
    return "";
  };

  const validateName = (name) => {
    if (!name) return "Name is required";
    if (name.length < 2) return "Name must be at least 2 characters long";
    if (!/^[a-zA-Z\s]+$/.test(name))
      return "Name can only contain letters and spaces";
    return "";
  };

  const validateForm = () => {
    const newErrors = {};

    if (currentState === "Sign Up") {
      const nameError = validateName(data.name);
      if (nameError) newErrors.name = nameError;
    }

    const emailError = validateEmail(data.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(data.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({
      ...data,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  //Funstion for user Login
  const onLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    let newURL = url;

    // Checking state where we are and update our URL acording to this
    if (currentState === "Log In") {
      newURL += "/user/login";
    } else {
      newURL += "/user/register";
    }

    try {
      const response = await axios.post(newURL, data);

      if (response.data.success) {
        loadUserData(response.data.token);
        setShowLogin(false);
        console.log(response);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  // Forgot password handler
  const handleForgotPassword = async () => {
    const emailError = validateEmail(forgotEmail);
    if (emailError) {
      setResetError(emailError);
      return;
    }

    try {
      const response = await axios.post(`${url}/user/check-email`, {
        email: forgotEmail,
      });
      if (response.data.success) {
        setResetStep(1);
        setResetError("");
      } else {
        setResetError("Email not found");
      }
    } catch (error) {
      setResetError("Something went wrong");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const passwordError = validatePassword(data.password);
    if (passwordError) {
      setResetError(passwordError);
      return;
    }

    try {
      const response = await axios.post(`${url}/user/reset-password`, {
        email: forgotEmail,
        password: data.password,
      });

      if (response.data.success) {
        setResetSuccess("Password updated successfully!");
        setResetError("");
        setTimeout(() => {
          setForgotMode(false);
          setResetStep(0);
          setForgotEmail("");
          setData({ ...data, password: "" });
          setResetSuccess("");
        }, 2000);
      } else {
        setResetError("Failed to update password");
      }
    } catch (error) {
      setResetError("Something went wrong");
    }
  };

  return (
    <>
      <div className="login-popup">
        <form
          onSubmit={
            forgotMode
              ? resetStep === 0
                ? handleForgotPassword
                : handleResetPassword
              : onLogin
          }
          className="login-container"
        >
          <div className="login-title">
            <h2>{forgotMode ? "Forgot Password" : currentState}</h2>
            <img
              onClick={() => setShowLogin(false)}
              src={assets.cross_icon}
              alt="Close"
            />
          </div>
          <div className="login-field">
            {forgotMode ? (
              resetStep === 0 ? (
                <div className="input-group">
                  <input
                    name="forgotEmail"
                    onChange={(e) => setForgotEmail(e.target.value)}
                    value={forgotEmail}
                    type="email"
                    placeholder="Enter your email"
                    required
                    className={
                      resetError && resetError.includes("email") ? "error" : ""
                    }
                  />
                </div>
              ) : (
                <div className="input-group">
                  <input
                    name="password"
                    onChange={onChangeHandler}
                    value={data.password}
                    type="password"
                    placeholder="Enter new password"
                    required
                    className={
                      resetError && resetError.includes("Password")
                        ? "error"
                        : ""
                    }
                  />
                </div>
              )
            ) : (
              <>
                {currentState === "Log In" ? (
                  <></>
                ) : (
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Enter your name"
                      name="name"
                      onChange={onChangeHandler}
                      value={data.name}
                      required
                      className={errors.name ? "error" : ""}
                    />
                    {errors.name && (
                      <span className="error-message">{errors.name}</span>
                    )}
                  </div>
                )}
                <div className="input-group">
                  <input
                    name="email"
                    onChange={onChangeHandler}
                    value={data.email}
                    type="email"
                    placeholder="Enter your email"
                    required
                    className={errors.email ? "error" : ""}
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>
                <div className="input-group">
                  <input
                    name="password"
                    onChange={onChangeHandler}
                    value={data.password}
                    type="password"
                    placeholder="Enter your password"
                    required
                    className={errors.password ? "error" : ""}
                  />
                  {errors.password && (
                    <span className="error-message">{errors.password}</span>
                  )}
                </div>
              </>
            )}
          </div>
          {forgotMode ? (
            <button type="submit">
              {resetStep === 0 ? "Check Email" : "Reset Password"}
            </button>
          ) : (
            <button type="submit">
              {currentState === "Sign Up" ? "Create Account" : "Log In"}
            </button>
          )}
          {forgotMode && resetError && (
            <p className="error-text">{resetError}</p>
          )}
          {forgotMode && resetSuccess && (
            <p className="success-text">{resetSuccess}</p>
          )}
          {!forgotMode && (
            <div className="login-condition">
              <input type="checkbox" required />
              <p>
                By continuing, You agreed to the terms of use and privacy policy
              </p>
            </div>
          )}
          {!forgotMode && currentState === "Log In" ? (
            <>
              <p>
                <span
                  onClick={async () => {
                    setForgotMode(true);
                    setResetError("");
                    setResetSuccess("");
                    setForgotEmail(data.email);
                    if (data.email) {
                      // Immediately check if email exists
                      try {
                        const response = await axios.post(
                          `${url}/user/check-email`,
                          { email: data.email }
                        );
                        if (response.data.exists) {
                          setResetStep(1);
                        } else {
                          setResetStep(0);
                          setResetError("No account found with this email.");
                        }
                      } catch (err) {
                        setResetStep(0);
                        setResetError("Server error. Please try again later.");
                      }
                    } else {
                      setResetStep(0);
                    }
                  }}
                  style={{ color: "var(--primary-color)", cursor: "pointer" }}
                >
                  Forgot Password?
                </span>
              </p>
              <p>
                Create a new account?{" "}
                <span onClick={() => setCurrentState("Sign Up")}>
                  Click Here
                </span>
              </p>
            </>
          ) : !forgotMode ? (
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrentState("Log In")}>Login Here</span>
            </p>
          ) : (
            <p>
              <span
                onClick={() => {
                  setForgotMode(false);
                  setResetStep(0);
                  setResetError("");
                  setResetSuccess("");
                }}
              >
                {" "}
                Back to Login
              </span>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginPopup;