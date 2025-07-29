// fixImagePaths.js
// Script to fix image paths in the database by removing "uploads/" prefix

const mongoose = require('mongoose');
const foodModel = require('./Models/food');

require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

async function fixImagePaths() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const foods = await foodModel.find({});
    let updated = 0;

    for (const food of foods) {
      if (food.image && food.image.startsWith('uploads/')) {
        const newImagePath = food.image.replace('uploads/', '');
        await foodModel.updateOne({ _id: food._id }, { $set: { image: newImagePath } });
        console.log(`Updated ${food.name}: ${food.image} -> ${newImagePath}`);
        updated++;
      }
    }

    console.log(`\nDone. Updated ${updated} food items.`);
  } catch (error) {
    console.error('Error fixing image paths:', error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

fixImagePaths(); 