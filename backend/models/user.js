const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    dietaryRestrictions: {type: [String], deafult: []},
    ingredients: {type: [String], deafult: []},
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
});

module.exports = mongoose.model('User', userSchema);
