// importFoods.js
// Script to import static meals into the foods collection

const mongoose = require('mongoose');
const path = require('path');

// Import the food schema and create a model
const foodSchema = require('./Schema/foodModel');
const Food = mongoose.model('Food', foodSchema);

require('dotenv').config();
// Use the same MongoDB Atlas connection string as your main app
const MONGODB_URI = process.env.MONGODB_URI;

const foods = [
  {
    name: "Greek salad",
    description: "Food provides essential nutrients for overall health and well-being",
    price: 12,
    image: "uploads/food_1.png",
    category: "Salad"
  },
  {
    name: "Veg salad",
    description: "Food provides essential nutrients for overall health and well-being",
    price: 18,
    image: "uploads/food_2.png",
    category: "Salad"
  },
  {
    name: 'Clover Salad',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 16,
    image: 'uploads/food_3.png',
    category: 'Salad',
  },
  {
    name: 'Chicken Salad',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 24,
    image: 'uploads/food_4.png',
    category: 'Salad',
  },
  {
    name: 'Lasagna Rolls',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 14,
    image: 'uploads/food_5.png',
    category: 'Rolls',
  },
  {
    name: 'Peri Peri Rolls',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 12,
    image: 'uploads/food_6.png',
    category: 'Rolls',
  },
  {
    name: 'Chicken Rolls',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 20,
    image: 'uploads/food_7.png',
    category: 'Rolls',
  },
  {
    name: 'Veg Rolls',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 15,
    image: 'uploads/food_8.png',
    category: 'Rolls',
  },
  {
    name: 'Ripple Ice Cream',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 14,
    image: 'uploads/food_9.png',
    category: 'Deserts',
  },
  {
    name: 'Fruit Ice Cream',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 22,
    image: 'uploads/food_10.png',
    category: 'Deserts',
  },
  {
    name: 'Jar Ice Cream',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 10,
    image: 'uploads/food_11.png',
    category: 'Deserts',
  },
  {
    name: 'Vanilla Ice Cream',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 12,
    image: 'uploads/food_12.png',
    category: 'Deserts',
  },
  {
    name: 'Chicken Sandwich',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 12,
    image: 'uploads/food_13.png',
    category: 'Sandwich',
  },
  {
    name: 'Vegan Sandwich',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 18,
    image: 'uploads/food_14.png',
    category: 'Sandwich',
  },
  {
    name: 'Grilled Sandwich',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 16,
    image: 'uploads/food_15.png',
    category: 'Sandwich',
  },
  {
    name: 'Bread Sandwich',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 24,
    image: 'uploads/food_16.png',
    category: 'Sandwich',
  },
  {
    name: 'Cup Cake',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 14,
    image: 'uploads/food_17.png',
    category: 'Cake',
  },
  {
    name: 'Vegan Cake',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 12,
    image: 'uploads/food_18.png',
    category: 'Cake',
  },
  {
    name: 'Butterscotch Cake',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 20,
    image: 'uploads/food_19.png',
    category: 'Cake',
  },
  {
    name: 'Sliced Cake',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 15,
    image: 'uploads/food_20.png',
    category: 'Cake',
  },
  {
    name: 'Garlic Mushroom ',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 14,
    image: 'uploads/food_21.png',
    category: 'Pure Veg',
  },
  {
    name: 'Fried Cauliflower',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 22,
    image: 'uploads/food_22.png',
    category: 'Pure Veg',
  },
  {
    name: 'Mix Veg Pulao',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 10,
    image: 'uploads/food_23.png',
    category: 'Pure Veg',
  },
  {
    name: 'Rice Zucchini',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 12,
    image: 'uploads/food_24.png',
    category: 'Pure Veg',
  },
  {
    name: 'Cheese Pasta',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 12,
    image: 'uploads/food_25.png',
    category: 'Pasta',
  },
  {
    name: 'Tomato Pasta',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 18,
    image: 'uploads/food_26.png',
    category: 'Pasta',
  },
  {
    name: 'Creamy Pasta',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 16,
    image: 'uploads/food_27.png',
    category: 'Pasta',
  },
  {
    name: 'Chicken Pasta',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 24,
    image: 'uploads/food_28.png',
    category: 'Pasta',
  },
  {
    name: 'Buttter Noodles',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 14,
    image: 'uploads/food_29.png',
    category: 'Noodles',
  },
  {
    name: 'Veg Noodles',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 12,
    image: 'uploads/food_30.png',
    category: 'Noodles',
  },
  {
    name: 'Somen Noodles',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 20,
    image: 'uploads/food_31.png',
    category: 'Noodles',
  },
  {
    name: 'Cooked Noodles',
    description: 'Food provides essential nutrients for overall health and well-being',
    price: 15,
    image: 'uploads/food_32.png',
    category: 'Noodles',
  },
];

async function importFoods() {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Optional: Remove all existing foods first
    // await Food.deleteMany({});

    await Food.insertMany(foods);
    console.log('Foods imported successfully!');
  } catch (error) {
    console.error('Error importing foods:', error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

importFoods(); 