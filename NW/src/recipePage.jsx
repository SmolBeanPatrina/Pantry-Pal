import React, { useState, useEffect } from "react";
import TableOfContents from "./tableofcontents";
import Section from "./sections";
import Navbar from "./componenets/Navbar";

const RecipePage = () => {
      const [recipesData, setRecipes] = useState({
        recipes: []
      });


    const getRecipes = async (e) => {
        e.preventDefault();
      
        try {
          
          const response = await fetch("http://localhost:4000/recipes", {
            method: "GET",  // Use GET instead of POST
            headers: {
              "Content-Type": "application/json",  // This is optional for GET requests, but it's safe to include it
            },
          });
      
          if (response.ok) {
            const result = await response.json();
            console.log(result.message);
            alert("Got recipes!");

            // Parse the JSON string into a JavaScript object
            //alert(response);
            const jsonString = JSON.stringify(result);
            console.log(jsonString);

            const parsedObject = JSON.parse(jsonString);

            // Accessing specific fields from each recipe
            //const firstRecipeId = parsedObject.results[0].id;

            setRecipes(prevState => ({
                ...prevState,  // Spread the previous state
                recipes: parsedObject.recipes  // Replace the old recipes array with the new one
            }));

            console.log(recipesData);

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
        const decodedDiv = document.createElement('div');
        decodedDiv.innerHTML = string;

        const plainText = decodedDiv.textContent || decodedDiv.innerText;
        return plainText;
    }

    const printAndGiveBack = (image) => {
        console.log(image);
        return image;
    }

    useEffect(() => {
        console.log(recipesData); // This will log when the state is updated
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
                {recipesData.recipes.map((section) => (
                <Section
                    key={section.id}
                    id={section.id}
                    title={section.title}
                    content={convertToReadable(section.description)}
                    image = {printAndGiveBack(section.image)}
                    source = {section.sourceUrl}
                />
                ))}
            </main>
            
            </div>
        </div>
    );
};

export default RecipePage;
