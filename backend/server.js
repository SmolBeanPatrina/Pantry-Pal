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
const PORT = process.env.PORT;

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect("mongodb://127.0.0.1:27017/pantrypal")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Create a new user
// const createUser = async () => {
//   const newUser = new User({
//     username: "exampleUser",
//     password: "securePassword123", // Ideally, hash this before saving!
//     name: "John Doe",
//   });

//   try {
//     const savedUser = await newUser.save();
//     console.log("User created successfully:", savedUser);
//   } catch (err) {
//     console.error("Error creating user:", err);
//   }
// };

// createUser();

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests

// Connect to MongoDB
// connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('Server is connected');
});

app.post('/create-user', async (req, res) => {
    const { username, password, name, dietaryRestrictions, ingredients } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
  
      const newUser = new User({
        username: username,
        password: hashedPassword,  // Store the hashed password
        name: name,
        dietaryRestrictions: dietaryRestrictions,
        ingredients: ingredients
      });
  
      const savedUser = await newUser.save();
      console.log("User created successfully:", savedUser);
      res.status(201).json({ message: 'User created successfully', user: savedUser });
    } catch (err) {
      console.error("Error creating user:", err);
      res.status(500).json({ message: 'Error creating user', error: err });
    }
  });  

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Login failed', details: err.message });
    }
});

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
