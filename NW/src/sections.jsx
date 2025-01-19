import React from "react";

const Section = ({ id, title, content }) => (
  <section id={id} style={{ margin: "100px 0" }}>
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <p>{content}</p>
  </section>
);

export default Section;
