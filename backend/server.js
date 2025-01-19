const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Centralized MongoDB connection logic
const authRoutes = require('./routes/auth'); // Import authentication routes
const User = require('./models/User'); // Import the User model

const mongoose = require('mongoose');
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect("mongodb://localhost:27017/pantrypal", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Create a new user
const createUser = async () => {
  const newUser = new User({
    username: "exampleUser",
    password: "securePassword123", // Ideally, hash this before saving!
    name: "John Doe",
  });

  try {
    const savedUser = await newUser.save();
    console.log("User created successfully:", savedUser);
  } catch (err) {
    console.error("Error creating user:", err);
  }
};

createUser();

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests

// Connect to MongoDB
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('Server is connected');
});

app.use('/api/auth', authRoutes);

// Example endpoint for recipes
app.get('/recipes', async (req, res) => {
    const { includeIngredients, cuisine, diet} = req.query; // Expecting a query parameter like ?query=pasta
    

    try {
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
            params: {
                apiKey: process.env.SPOONACULAR_API_KEY,
                includeIngredients, // List of ingredients
                cuisine,            // Cuisine preference
                diet,               // Diet preference
                addRecipeInformation : true

            },
        });

        //res.send(response.data);
        res.json(response.data); // Send the API response back to the client
    } catch (error) {
        console.error('Error fetching data from Spoonacular:', error.message);
        res.status(500).json({ error: 'An error occurred' });
    }
});




// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
