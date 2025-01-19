import React, { useState, useEffect } from "react";
import TableOfContents from "./tableofcontents";
import Section from "./sections";
import Navbar from "./componenets/Navbar";

const RecipePage = () => {
  const [recipesData, setRecipes] = useState({ recipes: [] });

  const getRecipes = async (e) => {
    e.preventDefault();

    const username = localStorage.getItem("username");
    if (!username) {
      alert("Please log in first.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/recipes?username=${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result); // Log the result for debugging

        // Update the state with the recipes data from the backend
        setRecipes({
          recipes: result.recipes || [], // Ensure it's an empty array if no recipes are found
        });

        alert("Got recipes!");
      } else {
        console.error("Failed to get recipes:", response.statusText);
        alert("Error getting recipes. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please check your network connection.");
    }
  };

  const convertToReadable = (string) => {
    const decodedDiv = document.createElement("div");
    decodedDiv.innerHTML = string;
    return decodedDiv.textContent || decodedDiv.innerText;
  };

  const printAndGiveBack = (image) => {
    console.log(image); // Log the image to inspect
    return image;
  };

  useEffect(() => {
    console.log(recipesData); // This will log when the recipes data state is updated
  }, [recipesData]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Navbar />
      <button
        onClick={getRecipes}
        className="mt-16 mb-8 bg-red-500 text-white px-4 py-2 rounded-full"
      >
        Generate Recipes
      </button>

      <div className="w-full max-w-4xl px-4">
        <TableOfContents sections={recipesData.recipes} />
        <main>
          {recipesData.recipes.length > 0 ? (
            recipesData.recipes.map((recipe) => (
              <Section
                key={recipe.id}
                id={`recipe-${recipe.id}`}  // Unique id for each section
                title={recipe.title}
                content={convertToReadable(recipe.description)}
                image={printAndGiveBack(recipe.image)}
                source={recipe.sourceUrl}
              />
            ))
          ) : (
            <p>No recipes found. Please try again later.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default RecipePage;
