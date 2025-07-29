const userModel = require("../Models/usermodel");

module.exports = {
  //Add items to cart
  addToCart: async (req, res) => {
    try {
      //while sending request we will not send userId, we send token and convert token into  UserId
      let userData = await userModel.findById(req.body.userId);

      //Now we can extract all the user data but here we only cartData
      let cartData = userData.cartData; //after that our users cart data is stored in this variable

      // when there's no data in cart
      if (!cartData[req.body.itemId]) {
        cartData[req.body.itemId] = 1;
      }
      // when there's  data in cart, we simply increment the data
      else {
        cartData[req.body.itemId] += 1;
      }

      //now we have to update the cart with updated user cartData
      await userModel.findByIdAndUpdate(req.body.userId, { cartData });

      res.send({
        success: true,
        message: "Added to cart",
      });
    } catch (error) {
      console.log(error);
      res.send({
        success: false,
        message: "Error",
      });
    }
  },

  //Remove items from cart
  removeFromCart: async (req, res) => {
    try {
      let userData = await userModel.findById(req.body.userId);

      //We get user data now we have to extract cart data

      let cartData = await userData.cartData; //we store the cart data in this variable

      //Now we have to check that which item we want to remove is actually exists in Cart or not
      if (cartData[req.body.itemId] > 0) {
        cartData[req.body.itemId] -= 1; //we decrease the item if its existed
      }

      //now we have to update the user cart data

      await userModel.findByIdAndUpdate(req.body.userId, { cartData }); //new cart data will be updated

      res.send({
        success: true,
        message: "Removed from cart",
      });
    } catch (error) {
      console.log(error);
      res.send({
        success: false,
        message: "Error",
      });
    }
  },

  //Fetch user cart data which is entered by the user
  getUserCart: async (req, res) => {
    try {
      //first we will find the user data using user id
      //we will get the user id using middleware
      let userData = await userModel.findById(req.body.userId);

      //from this userdata we have to extract the cart data

      let cartData = await userData.cartData; //user cart data stored in this variable

      res.send({
        success: true,
        cartData,
      });
    } catch (error) {
      console.log(error);
      res.send({
        success: false,
        message: "Error",
      });
    }
  },
};
