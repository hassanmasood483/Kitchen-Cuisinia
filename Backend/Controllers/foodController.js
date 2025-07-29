const foodModel = require("../Models/food");

const fs = require("fs");

// Add Food Item
module.exports = {
  addFood: async (req, res) => {
    let image_file = `${req.file.filename}`;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_file,
    });
    try {
      await food.save();
      res.send({ success: true, message: "Food Added " });
    } catch (error) {
      console.log(error);
      res.send({ success: false, message: "Food addition failed" });
    }
  },

  // All Food List

  listFood: async (req, res) => {
    try {
      const foods = await foodModel.find({});
      res.send({ success: true, data: foods });
    } catch (error) {
      console.log(error);
      res.send({ success: false, message: "Error" });
    }
  },
  removeFood: async (req, res) => {
    try {
      const food = await foodModel.findById(req.body.id);
      fs.unlink(`uploads/${food.image}`, () => {});

      await foodModel.findByIdAndDelete(req.body.id);
      res.send({ success: true, message: "Food Removed" });
    } catch (error) {
      console.log(error);
      res.send({ success: false, message: "Food Not Removed" });
    }
  },
};
