const jwt = require("jsonwebtoken");
require("dotenv").config();
const userModel = require("../Models/usermodel");

// File to authenticate user token

const authMiddleWare = async (req, res, next) => {
  //we take the token from user using the header and we will destructure the token from header

  const { token } = req.headers;

  //check rather that token exists or not

  if (!token) {
    return res.status(401).send({
      success: false,
      message: "Not Authorized. Login again.",
    });
  }

  // In try catch we have the token,we have to decode the token
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user exists in the database
    const user = await userModel.findById(token_decode.id);
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User not found. Please login again.",
      });
    }

    //During token creation we have user id, now we set that id in req.body
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Invalid or expired token. Please login again.",
    });
  }
};

module.exports = authMiddleWare;
