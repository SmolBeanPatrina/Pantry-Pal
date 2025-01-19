const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    dietaryRestrictions: { type: [String], default: [] },
    ingredients: { type: [String], default: [] },
});

module.exports = mongoose.model('User', userSchema);
