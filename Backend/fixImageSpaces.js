// fixImageSpaces.js
// Script to fix image filenames in the database by removing spaces before .png extension

const mongoose = require('mongoose');
const foodModel = require('./Models/food');

require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

async function fixImageSpaces() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const foods = await foodModel.find({});
    let updated = 0;

    for (const food of foods) {
      if (food.image && food.image.includes(' .png')) {
        const newImagePath = food.image.replace(' .png', '.png');
        await foodModel.updateOne({ _id: food._id }, { $set: { image: newImagePath } });
        console.log(`Updated ${food.name}: ${food.image} -> ${newImagePath}`);
        updated++;
      }
    }

    console.log(`\nDone. Updated ${updated} food items.`);
  } catch (error) {
    console.error('Error fixing image spaces:', error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

fixImageSpaces(); 