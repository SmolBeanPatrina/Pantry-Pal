import React, { useState } from "react";
import Navbar from "./Navbar";

const PreferencesForm = () => {
  const [formData, setFormData] = useState({
    diet: "omnivore",
    cuisine: "",
    utensils: [],
    ingredients: [],
  });

  const handleCheckboxChange = (e, key) => {
    const { value, checked } = e.target;

    setFormData((prevFormData) => {
      const updatedArray = checked
        ? [...prevFormData[key], value] // Add value if checked
        : prevFormData[key].filter((item) => item !== value); // Remove value if unchecked

      return {
        ...prevFormData,
        [key]: updatedArray,
      };
    });
  };

  const handleDietChange = (e) => {
    setFormData({
      ...formData,
      diet: e.target.value,
    });
  };

  const handleCuisineChange = (e) => {
    const { value } = e.target;

    console.log(`Cuisine selected: ${value}`); // Debugging log
    setFormData({
      ...formData,
      cuisine: value, // Correctly update the cuisine field
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const username = localStorage.getItem("username"); // Retrieve username from localStorage
    if (!username) {
      alert("User not logged in");
      return;
    }
  
    console.log("Form Data Sent to API:", formData); // Log data being sent to the backend
  
    try {
      const response = await fetch("http://localhost:4000/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: localStorage.getItem("username"), // Use the username from localStorage
          ...formData,
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        alert("Preferences Updated!");
      } else {
        console.error("Failed to update preferences:", response.statusText);
        alert("Error during preferences selection. Please try again.");
      }
    } catch (error) {
      console.error("Error updating preferences:", error.message);
      alert("An error occurred. Please check your network connection.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Navbar />
      <header className="mt-16 mb-8">
        <p className="text-2xl">
          <strong>Preferences:</strong>
        </p>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4 mb-8">
          {/* Diet Options */}
          <label htmlFor="diet">
            <strong>Pick your diet:</strong>
          </label>
          <select
            id="diet"
            name="diet"
            value={formData.diet}
            onChange={handleDietChange}
          >
            <option value="omnivore">Omnivore</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
          </select>
        </div>

        {/* Cuisines */}
        <div className="flex flex-col space-y-2 mb-8">
          <label>
            <strong>Select your favourite cuisine:</strong>
          </label>
          {["Italian", "Chinese", "Indian", "Mexican"].map((cuisine) => (
            <label key={cuisine}>
              <input
                type="radio"
                name="cuisine"
                value={cuisine.toLowerCase()}
                checked={formData.cuisine === cuisine.toLowerCase()}
                onChange={handleCuisineChange}
              />
              {cuisine}
            </label>
          ))}
            </div>

        {/* Utensils */ }
            < div className = "flex flex-col space-y-2 mb-8" >
            <label>
              <strong>Select your kitchen utensils:</strong>
            </label>
          {
              ["Knife", "Spatula", "Mixing Bowl", "Whisk", "Grater", "Peeler"].map(
                (utensil) => (
                  <label key={utensil}>
                    <input
                      type="checkbox"
                      value={utensil.toLowerCase().replace(" ", "_")}
                      checked={formData.utensils.includes(
                        utensil.toLowerCase().replace(" ", "_")
                      )}
                      onChange={(e) => handleCheckboxChange(e, "utensils")}
                    />
                    {utensil}
                  </label>
                )
              )
            }
        </div>

        {/* Ingredients */}
        <div className="flex flex-col space-y-2 mb-8">
          <label>
            <strong>Select the ingredients you have in your fridge:</strong>
          </label>
          {[
            "Salt",
            "Pepper",
            "Tomato",
            "Garlic",
            "Cheese",
            "Chicken",
            "Rice",
            "Basil",
          ].map((ingredient) => (
            <label key={ingredient}>
              <input
                type="checkbox"
                value={ingredient.toLowerCase().replace(" ", "_")}
                checked={formData.ingredients.includes(
                  ingredient.toLowerCase().replace(" ", "_")
                )}
                onChange={(e) => handleCheckboxChange(e, "ingredients")}
              />
              {ingredient}
            </label>
          ))}
        </div>

        {/* Submit Button */}
        <div className="items-center">
          <button
            type="submit"
            className="bg-gray-500 text-white px-6 py-2 rounded-full mb-8"
            onClick={() => console.log(formData)}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreferencesForm;
