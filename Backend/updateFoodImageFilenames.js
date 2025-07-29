// updateFoodImageFilenames.js
// Script to update food image filenames in the database to match actual files in uploads/

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const foodModel = require('./Models/food');

require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;
const uploadsDir = path.join(__dirname, 'uploads');

async function updateFilenames() {
  await mongoose.connect(MONGODB_URI);
  const foods = await foodModel.find({});
  const files = fs.readdirSync(uploadsDir);

  let updated = 0;
  for (const food of foods) {
    // Find a file that ends with the original image name
    const match = files.find(f => f.endsWith(food.image));
    if (match && food.image !== match) {
      await foodModel.updateOne({ _id: food._id }, { $set: { image: match } });
      console.log(`Updated ${food.name}: ${food.image} -> ${match}`);
      updated++;
    }
  }
  console.log(`\nDone. Updated ${updated} food items.`);
  await mongoose.disconnect();
}

updateFilenames(); 