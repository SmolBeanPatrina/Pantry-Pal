const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/pantrypal', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        console.log('MongoDB connected');
      }).catch(err => {
        console.error('MongoDB connection failed:', err);
      });
};

module.exports = connectDB;
