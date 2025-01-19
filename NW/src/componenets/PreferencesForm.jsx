import React, { useState } from "react";
import Navbar from "./Navbar";

const PreferencesForm = () => {
  const [formData, setFormData] = useState({
    vegetarian: false,
    vegan: false,
    cuisines: [],
    utensils: [],
    ingredients: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleUtensilsChange = (e) => {
    const { options } = e.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setFormData({
      ...formData,
      utensils: selectedOptions,
    });
  };

  const handleCuisinesChange = (e) => {
    const { options } = e.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setFormData({
      ...formData,
      cuisines: selectedOptions,
    });
  };

  const handleIngredientsChange = (e) => {
    const { options } = e.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setFormData({
      ...formData,
      ingredients: selectedOptions,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send the form data to the server
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
      console.error("Error:", error);
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
        <div className="flex flex-col space-y-2 mb-8">
          {/* Vegetarian Checkbox */}
          <label>
            <input
              type="checkbox"
              name="vegetarian"
              checked={formData.vegetarian} // Controlled component
              onChange={handleChange}
            />
            Vegetarian
          </label>

          {/* Vegan Checkbox */}
          <label>
            <input
              type="checkbox"
              name="vegan"
              checked={formData.vegan} // Controlled component
              onChange={handleChange}
            />
            Vegan
          </label>
        </div>
        <div className="flex flex-col items-start space-y-2 mb-8">
          <label htmlFor="cuisines">Select your favourite cuisines:</label>
          <select
            id="cuisines"
            name="cuisines"
            multiple
            value={formData.cuisines}
            onChange={handleCuisinesChange}
            style={{ width: "200px", height: "100px" }} // Add some size for better usability
          >
            <option value="italian">Italian</option>
            <option value="chinese">Chinese</option>
            <option value="indian">Indian</option>
            <option value="mexican">Mexican</option>
          </select>
        </div>
        <div className="flex flex-col items-start space-y-2 mb-8">
          <label htmlFor="utensils">Select your kitchen utensils:</label>
          <select
            id="utensils"
            name="utensils"
            multiple
            value={formData.utensils}
            onChange={handleUtensilsChange}
            style={{ width: "200px", height: "100px" }} // Add some size for better usability
          >
            <option value="knife">Knife</option>
            <option value="spatula">Spatula</option>
            <option value="mixing_bowl">Mixing Bowl</option>
            <option value="whisk">Whisk</option>
            <option value="grater">Grater</option>
            <option value="peeler">Peeler</option>
          </select>
        </div>
        <div className="flex flex-col items-start space-y-2 mb-8">
          <label htmlFor="ingredients">Select the ingredients you have in your fridge:</label>
          <select
            id="ingredients"
            name="ingredients"
            multiple
            value={formData.ingredients}
            onChange={handleIngredientsChange}
            style={{ width: "200px", height: "100px" }} // Add some size for better usability
          >
            <option value="salt">Salt</option>
            <option value="pepper">Pepper</option>
            <option value="sugar">Sugar</option>
            <option value="flour">Flour</option>
            <option value="butter">Butter</option>
            <option value="oil">Oil</option>
            <option value="vinegar">Vinegar</option>
            <option value="garlic">Garlic</option>
            <option value="onion">Onion</option>
            <option value="tomato">Tomato</option>
            <option value="egg">Egg</option>
            <option value="milk">Milk</option>
            <option value="cheese">Cheese</option>
            <option value="bread">Bread</option>
            <option value="chicken">Chicken</option>
            <option value="beef">Beef</option>
            <option value="carrot">Carrot</option>
            <option value="potato">Potato</option>
            <option value="rice">Rice</option>
            <option value="pasta">Pasta</option>
            <option value="lemon">Lemon</option>
            <option value="basil">Basil</option>
            <option value="parsley">Parsley</option>
            <option value="cinnamon">Cinnamon</option>
            <option value="honey">Honey</option>
            <option value="ginger">Ginger</option>
            <option value="chili_powder">Chili Powder</option>
            <option value="paprika">Paprika</option>
            <option value="soy_sauce">Soy Sauce</option>
            <option value="ketchup">Ketchup</option>
            <option value="mustard">Mustard</option>
            <option value="mayonnaise">Mayonnaise</option>
            <option value="cream">Cream</option>
            <option value="yeast">Yeast</option>

          </select>
        </div>
        <div className=" items-center ">
          <button type="submit" style={{ padding: "10px 15px", cursor: "pointer" }}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreferencesForm;
