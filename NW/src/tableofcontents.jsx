import React, { useState, useEffect } from "react";
import "./TableOfContents.css";

const TableOfContents = ({ sections }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offsets = sections.map((section) =>
        document.getElementById(section.id).getBoundingClientRect().top
      );

      const activeIndex = offsets.findIndex((offset) => offset > 0) - 1;
      setActiveSection(
        activeIndex >= 0 ? sections[activeIndex].id : sections[0].id
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <div>
      {/* Toggle Button */}
      <button onClick={toggleSidebar} className="toc-toggle">
        {isOpen ? "←" : "→"}
      </button>

      {/* Sidebar */}
      <div className={`toc ${isOpen ? "open" : ""}`}>
        <ul>
          {sections.map((section) => (
            <li
              key={section.id}
              className={activeSection === section.id ? "active" : ""}
            >
              <a href={`#${section.id}`}>{section.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TableOfContents;
