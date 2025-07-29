// listImageFilenames.js
// Script to list all image filenames in the database

const mongoose = require('mongoose');
const foodModel = require('./Models/food');

require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

async function listImageFilenames() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const foods = await foodModel.find({});
    console.log('\nAll food items and their image filenames:');
    console.log('==========================================');
    
    foods.forEach(food => {
      console.log(`${food.name}: "${food.image}"`);
    });

    console.log(`\nTotal food items: ${foods.length}`);
  } catch (error) {
    console.error('Error listing image filenames:', error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

listImageFilenames(); 