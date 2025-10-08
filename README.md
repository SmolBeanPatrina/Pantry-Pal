# Pantry Pal

Do you ever have a few remaining groceries but aren't quite sure what to do with them? Well our website is perfect for you!
You can input the groceries that you have in our website and it'll find some curated recipes for you using the Spoonacular API. 
It has over 5000 recipes, and will suggest customized recipes tailored perfectly to the user's needs and preferences. 
Even if you don't have leftover groceries, it can help you find new recipes for your everyday life when you just don't know what to cook for the day. It's just like a personal kitchen assistant!

## Tech Stack

### [Frontend](NW)
- **React**
- **Typescript**

### [Backend](backend)
- **Node.js** 
- **Express.js**
- **MongoDB (via locally run Mongoose)**
- **Spoonacular API**

## How it works

1. The user answers a few questions in a form and the answers are sent to the backend.
2. The backend calls stores the responses in the database and returns a few recipes based on the form's response.
3. The user can read through the returned recipes and click the embedded links directly to the recipe's original website.

## Additional Information
This project was created for the hackathon nwHacks 2025 and can be viewed on [Devpost](https://devpost.com/software/pantry-pal-mntkpi). 
This project is a fork of the [original github](https://github.com/floorence/nwHacks2025) for additional changes post-hackathon and the original README.me can be found [here](Original_README.md).
Originally developed by Patrina Cheung, Florence Shen, Rajrupa Sanyal, and Ahmed Khan on January 18-19 2025.