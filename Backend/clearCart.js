// clearCart.js
// Script to clear all cart data from the database

const mongoose = require('mongoose');

// Import the user schema and create a model
const userSchema = require('./Schema/userSchema');
const User = mongoose.model('User', userSchema);

require('dotenv').config();
// Use the same MongoDB Atlas connection string as your main app
const MONGODB_URI = process.env.MONGODB_URI;

async function clearAllCarts() {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Clear cart data for all users
    const result = await User.updateMany({}, { cartData: {} });
    
    console.log(`Cleared cart data for ${result.modifiedCount} users`);
    console.log('All cart data has been cleared successfully!');
  } catch (error) {
    console.error('Error clearing cart data:', error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

clearAllCarts(); 