import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const PreferencesForm = () => {

  const MAX_INGREDIENTS = 5;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    diet: "omnivore",
    cuisine: "",
    utensils: [],
    ingredients: [],
  });

  const handleCheckboxChange = (e, key) => {
    const { value, checked } = e.target;

    setFormData((prev) => {
      const currentSelections = prev[key];

      // If trying to add but already at max → block
      if (checked && currentSelections.length >= MAX_INGREDIENTS) {
        return prev;
      }

      return {
        ...prev,
        [key]: checked
          ? [...currentSelections, value]
          : currentSelections.filter((item) => item !== value),
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
    setFormData({
      ...formData,
      cuisine: e.target.value,
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/preferences`, {
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
        navigate("/recipes");
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
          <label htmlFor="cuisine">
            <strong>Pick your Cusine:</strong>
          </label>
          <select
            id="cuisine"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleCuisineChange}
          >
            <option value="African">African</option>
            <option value="American">American</option>
            <option value="Asian">Asian</option>
            <option value="British">British</option>
            <option value="Cajun">Cajun</option>
            <option value="Caribbean">Caribbean</option>
            <option value="Chinese">Chinese</option>
            <option value="Eastern European">Eastern European</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Greek">Greek</option>
            <option value="Indian">Indian</option>
            <option value="Irish">Irish</option>
            <option value="Italian">Italian</option>
            <option value="Japanese">Japanese</option>
            <option value="Jewish">Jewish</option>
            <option value="Korean">Korean</option>
            <option value="Latin American">Latin American</option>
            <option value="Mediterranean">Mediterranean</option>
            <option value="Mexican">Mexican</option>
            <option value="Middle Eastern">Middle Eastern</option>
            <option value="Nordic">Nordic</option>
            <option value="Southern">Southern</option>
            <option value="Spanish">Spanish</option>
            <option value="Thai">Thai</option>
            <option value="Vietnamese">Vietnamese</option>
          </select>
        </div>

        {/* Ingredients */}
        <div className="flex flex-col space-y-2 mb-8">
          <label>
            <strong>Select the ingredients you have in your fridge: (MAX 5)</strong>
          </label>
          {[
            "Rice",
            "Onion",
            "Spinach",
            "Chicken",
            "Tortilla",
            "Bread",
            "Cheese",
            "Tomato",
            "Potato",
            "Egg",
            "Milk",
            "Yogurt"
          ].map((ingredient) => (
            <label key={ingredient}>
              <input
                type="checkbox"
                value={ingredient.toLowerCase().replace(" ", "_")}
                checked={formData.ingredients.includes(
                  ingredient.toLowerCase().replace(" ", "_")
                )}
                disabled={
                  !formData.ingredients.includes(
                    ingredient.toLowerCase().replace(" ", "_")
                  ) && formData.ingredients.length >= MAX_INGREDIENTS
                }
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
          >
            Generate
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreferencesForm;
