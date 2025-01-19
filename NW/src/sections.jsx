import React from "react";

const Section = ({ id, title, content, image, source }) => (
    <div className="flex items-center gap-4">
        {image && (
            <div>
                <img src={image} alt={title} className="max-w-xs max-h-40 object-contain"/>
            </div>
        )}
        <div>
            <h1 className="text-2xl font-bold mb-4 mt-8">{title}</h1>
            <p className = "mb-8"> {content} </p>
            <a href={source} target="_blank" rel="noopener noreferrer">
                Click here to visit Recipe
            </a>
        </div>
    </div>
);

export default Section;
