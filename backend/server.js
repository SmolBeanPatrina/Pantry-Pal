const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Root route for testing
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Route to search recipes
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
    console.log(`Server is running on http://localhost:${PORT}`);
});
