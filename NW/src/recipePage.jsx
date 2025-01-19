import React, { useState } from "react";
import TableOfContents from "./tableofcontents";
import Section from "./sections";
import Navbar from "./componenets/Navbar";

const sections = [
  { id: "section1", title: "Introduction", content: "This is the intro." },
  { id: "section2", title: "Chapter 1", content: "This is chapter 1." },
  { id: "section3", title: "Chapter 2", content: "This is chapter 2." },
  { id: "section4", title: "Conclusion", content: "This is the conclusion." },
];

const RecipePage = () => {
      const [recipesData, setRecipes] = useState({
        recipes: []
      });


    const getRecipes = async (e) => {
        e.preventDefault();
      
        try {
          
          const response = await fetch("http://localhost:3000/recipes", {
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
            const parsedObject = JSON.parse(response);

            // Accessing specific fields from each recipe
            //const firstRecipeId = parsedObject.results[0].id;

            setRecipes(prevState => ({
                ...prevState,  // Spread the previous state
                recipes: parsedObject.results  // Replace the old recipes array with the new one
            }));

          } else {
            console.error("Failed to get recipes:", response.statusText);
            alert("Error getting recipes. Please try again.");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred. Please check your network connection.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Navbar />
            <div className="w-full max-w-4xl px-4">
            <TableOfContents sections={sections} />
            <main>
                {sections.map((section) => (
                <Section
                    key={section.id}
                    id={section.id}
                    title={section.title}
                    content={section.content}
                />
                ))}
            </main>
            </div>
        </div>
    );
};

export default RecipePage;
