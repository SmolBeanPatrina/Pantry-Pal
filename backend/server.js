const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const he = require('he');
const User = require('./models/User'); // Ensure this is correctly defined in your models folder
// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
const mongoURI = "mongodb://127.0.0.1:27017/pantrypal";
const SECRET_KEY = process.env.SECRET_KEY || "defaultSecretKey"; // Fallback for SECRET_KEY

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Allow only your frontend origin
app.use(bodyParser.json()); // Parse incoming JSON requests

// Routes
app.get('/', (req, res) => {
  res.send('Server is connected');
});

// Create User Endpoint
app.post('/create-user', async (req, res) => {
  const { username, password, name, dietaryRestrictions, ingredients } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

    const newUser = new User({
      username,
      password: hashedPassword, // Store the hashed password
      name,
      dietaryRestrictions,
      ingredients,
    });

    const savedUser = await newUser.save();
    console.log("User created successfully:", savedUser);
    res.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

// Login Endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
});

// Recipe Endpoint
let recipeIds = []; // Global variable to store recipe IDs


app.post('/preferences', async (req, res) => {
    console.log("Request Body:", req.body); // Log the incoming request body
    const { username, cuisine, utensils, dietaryRestrictions, ingredients } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user's preferences
        user.cuisine = cuisine || user.cuisine;
        user.utensils = utensils || user.utensils;
        user.dietaryRestrictions = dietaryRestrictions || user.dietaryRestrictions;
        user.ingredients = ingredients || user.ingredients;

        // Save the updated user
        await user.save();

        res.json({ message: 'Preferences updated successfully', user });
    } catch (error) {
        console.error('Error updating preferences:', error.message);
        res.status(500).json({ error: 'Failed to update preferences', details: error.message });
    }
});


    

// GET: Fetch full recipe details based on stored recipe IDs
// Fetch recipes based on user preferences
app.get('/recipes', async (req, res) => {
    const { username } = req.query;

    try {
        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Ensure ingredients and utensils are arrays
        const ingredients = Array.isArray(user.ingredients) ? user.ingredients : [];
        const utensils = Array.isArray(user.utensils) ? user.utensils : [];

        // Prepare query parameters based on user preferences
        const queryParams = {
            apiKey: process.env.SPOONACULAR_API_KEY,
            cuisine: user.cuisine || undefined,
            diet: user.dietaryRestrictions || undefined,
            includeIngredients: ingredients.length > 0 ? ingredients.join(',') : undefined,
            number: 10,
        };

        // If the user owns any utensils, include them in the query
        if (utensils.length > 0) {
            queryParams.equipment = utensils.join(','); // Convert array to comma-separated string
        }

        // Fetch basic recipes from Spoonacular based on the user's preferences
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
            params: queryParams,
        });

        // Fetch full details for each recipe by using their IDs
        const recipeDetailsPromises = response.data.results.map(recipe =>
            axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information`, {
                params: { apiKey: process.env.SPOONACULAR_API_KEY },
            })
        );

        // Wait for all the details to be fetched
        const recipeDetailsResponses = await Promise.all(recipeDetailsPromises);

        // Map the responses to the required format
        const recipes = recipeDetailsResponses.map(recipe => {
            const detailedRecipe = recipe.data;
            return {
                id: detailedRecipe.id,
                title: detailedRecipe.title,
                description: detailedRecipe.summary || 'No description available.',
                instructions: detailedRecipe.instructions || 'No instructions provided.',
                readyInMinutes: detailedRecipe.readyInMinutes,
                servings: detailedRecipe.servings,
                image: detailedRecipe.image,
                sourceUrl: detailedRecipe.sourceUrl,
            };
        });

        // Return the full recipe details
        res.json({ recipes });
    } catch (error) {
        console.error('Error fetching recipes:', error.message);
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
