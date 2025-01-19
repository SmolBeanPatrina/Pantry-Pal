const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cuisine: { type: String, default: "" }, // Ensure the field exists
    utensils: { type: [String], default: [] },
    dietaryRestrictions: { type: String, default: "" },
    ingredients: { type: [String], default: [] },
    recipes: { type: [String], default: [] }
});

module.exports = mongoose.model("User", userSchema);