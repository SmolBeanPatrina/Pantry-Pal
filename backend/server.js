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
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pantrypal";
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
    const {diet, cuisine, equipment, ingredients} = req.body;

    try {
        // Call Spoonacular API to fetch recipes
        console.log("about to get post");

        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
            params: {
                apiKey: process.env.SPOONACULAR_API_KEY,
                includeIngredients: ingredients,
                cuisine: cuisine,
                diet: diet,
                number: 10,
                addRecipeInformation: false // Just get IDs
            }
        });

        // Save recipe IDs to the global variable
        recipeIds = response.data.results.map(recipe => recipe.id);
        console.log(recipeIds);

        res.json({ message: 'Recipe IDs generated successfully', recipeIds });
    } catch (error) {
        console.error('Error fetching recipes:', error.message);
        res.status(500).json({ error: 'An error occurred while fetching recipes' });
    }
});

    

// GET: Fetch full recipe details based on stored recipe IDs
app.get('/recipes', async (req, res) => {
    if (recipeIds.length === 0) {
        return res.status(404).json({ error: 'No recipes found. Generate recipes first using POST /recipes.' });
    }

    try {
        // Fetch details for each recipe ID
        const recipeDetailsPromises = recipeIds.map(id =>
          axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
              params: { apiKey: process.env.SPOONACULAR_API_KEY }
          })
      );

      const recipeDetailsResponses = await Promise.all(recipeDetailsPromises);

      // Process the fetched recipe details
      const recipes = recipeDetailsResponses.map(response => {
          const recipe = response.data;

          // Decode and clean up the summary or description
          const cleanDescription = recipe.summary
              ? he.decode(recipe.summary.replace(/<\/?[^>]+(>|$)/g, ''))
              : 'No description available.';

          return {
              id: recipe.id,
              title: recipe.title,
              description: cleanDescription,
              instructions: recipe.instructions || 'No instructions provided.',
              readyInMinutes: recipe.readyInMinutes,
              servings: recipe.servings,
              image: recipe.image,
              sourceUrl: recipe.sourceUrl,
          };
      });

      res.json({ recipes });
  } catch (error) {
      console.error('Error fetching recipe details:', error.message);
      res.status(500).json({ error: 'An error occurred while fetching recipe details' });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
