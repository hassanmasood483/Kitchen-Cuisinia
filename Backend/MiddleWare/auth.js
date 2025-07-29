const jwt = require("jsonwebtoken");
require("dotenv").config();

// File to authenticate user token

const authMiddleWare = async (req, res, next) => {
  //we take the token from user using the header and we will destructure the token from header

  const { token } = req.headers;

  //check rather that token exists or not

  if (!token) {
    return res.send({
      success: false,
      message: "Not Authorized Login again",
    });
  }

  // In try catch we have the token,we have to decode the token
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    //During token creation we have user id, now we set that id in req.body
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Error",
    });
  }
};

module.exports = authMiddleWare;
