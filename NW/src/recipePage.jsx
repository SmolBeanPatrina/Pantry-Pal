import React, { useState, useEffect } from "react";
import TableOfContents from "./tableofcontents";
import Section from "./sections";
import Navbar from "./componenets/Navbar";
import { useNavigate } from "react-router-dom";

const RecipePage = () => {
  const [recipesData, setRecipes] = useState({ recipes: [] });
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
  const fetchRecipes = async () => {
      if (!username) {
        alert("Please log in first.");
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/recipes?username=${username}`
        );

        const result = await response.json();

        setRecipes({ recipes: result.recipes || [] });
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setRecipes({ recipes: [] });
      }
    };

    fetchRecipes();
  }, [username]); // ✅ only runs on page entry

  const convertToReadable = (string) => {
    const decodedDiv = document.createElement("div");
    decodedDiv.innerHTML = string;
    return decodedDiv.textContent || decodedDiv.innerText;
  };

  const printAndGiveBack = (image) => {
    console.log(image); // Log the image to inspect
    return image;
  };

  // useEffect(() => {
  //   console.log(recipesData); // This will log when the recipes data state is updated
  // }, [recipesData]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Navbar />
      <button
        onClick={() => navigate("/preferences")}
        className="mt-16 mb-8 bg-red-500 text-white px-4 py-2 rounded-full"
      >
        New Search
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
