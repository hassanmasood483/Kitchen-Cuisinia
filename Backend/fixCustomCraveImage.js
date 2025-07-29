// fixCustomCraveImage.js
// Script to fix the CustomCrave image filename by removing the space

const mongoose = require('mongoose');
const foodModel = require('./Models/food');

require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

async function fixCustomCraveImage() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find the CustomCrave item
    const customCrave = await foodModel.findOne({ name: 'CustomCrave' });
    
    if (customCrave) {
      console.log(`Found CustomCrave with image: "${customCrave.image}"`);
      
      // Fix the filename by removing the space
      const newImagePath = customCrave.image.replace('Screenshot (', 'Screenshot(');
      
      await foodModel.updateOne(
        { _id: customCrave._id }, 
        { $set: { image: newImagePath } }
      );
      
      console.log(`Updated CustomCrave image: "${customCrave.image}" -> "${newImagePath}"`);
    } else {
      console.log('CustomCrave item not found in database');
    }

  } catch (error) {
    console.error('Error fixing CustomCrave image:', error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

fixCustomCraveImage(); 