import React from 'react';
import Navbar from "./Navbar";

const About = () => {
    return (
        <div style={{ padding: '20px'}}>
            <Navbar />
            <h1 className = "text-2xl font-bold mb-4 mt-8">About Us</h1>
            <p>
                Welcome to PantryPal, your personalized recipe hub! We make cooking easier by 
                tailoring recipes to your unique preferences—whether it's dietary restrictions, 
                available kitchen equipment, or the ingredients you currently have on hand. No 
                more guessing what to make! Simply input your details, and we'll find the perfect 
                recipe for you. Enjoy cooking with ease, knowing that each dish is customized just 
                for you!

                If you're curious about the development of PantryPal, see our <a href="https://github.com/SmolBeanPatrina/Pantry-Pal">github repo</a>
            </p>
        </div>
    );
};

export default About;