// fixAllScreenshotSpaces.js
// Script to fix ALL image filenames that have spaces between "Screenshot" and parentheses

const mongoose = require('mongoose');
const foodModel = require('./Models/food');

require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

async function fixAllScreenshotSpaces() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const foods = await foodModel.find({});
    let updated = 0;

    for (const food of foods) {
      if (food.image && food.image.includes('Screenshot (')) {
        const newImagePath = food.image.replace(/Screenshot \(/g, 'Screenshot(');
        
        await foodModel.updateOne(
          { _id: food._id }, 
          { $set: { image: newImagePath } }
        );
        
        console.log(`Updated ${food.name}: "${food.image}" -> "${newImagePath}"`);
        updated++;
      }
    }

    console.log(`\nDone. Updated ${updated} food items.`);

  } catch (error) {
    console.error('Error fixing screenshot spaces:', error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

fixAllScreenshotSpaces(); 