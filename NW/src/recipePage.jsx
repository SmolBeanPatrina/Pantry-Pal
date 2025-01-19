import React from "react";
import TableOfContents from "./tableofcontents";
import Section from "./sections";
import Navbar from "./componenets/Navbar";

const sections = [
  { id: "section1", title: "Introduction", content: "This is the intro." },
  { id: "section2", title: "Chapter 1", content: "This is chapter 1." },
  { id: "section3", title: "Chapter 2", content: "This is chapter 2." },
  { id: "section4", title: "Conclusion", content: "This is the conclusion." },
];

const RecipePage = () => (
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

export default RecipePage;
