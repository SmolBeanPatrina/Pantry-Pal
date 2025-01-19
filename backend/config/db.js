const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      const dbURI = process.env.MONGO_URI; // Ensure your .env file contains this
      const conn = await mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`MongoDB connected: ${process.env.PORT}`);
    } catch (error) {
      console.error(`MongoDB connection error: ${error.message}`);
      process.exit(1); // Exit process with failure
    }
  };
  
  module.exports = connectDB;
