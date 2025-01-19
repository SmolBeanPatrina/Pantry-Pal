const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('./models/User'); // Ensure this is correctly defined in your models folder

// Load environment variables
dotenv.config();

const app = express();
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
app.get('/recipes', async (req, res) => {
  const { includeIngredients, cuisine, diet } = req.query;

  try {
    const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        apiKey: process.env.SPOONACULAR_API_KEY,
        includeIngredients, // List of ingredients
        cuisine,            // Cuisine preference
        diet,               // Diet preference
        addRecipeInformation: true,
      },
    });

    res.json(response.data); // Send the API response back to the client
  } catch (error) {
    console.error('Error fetching data from Spoonacular:', error.message);
    res.status(500).json({ error: 'An error occurred', details: error.message });
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
