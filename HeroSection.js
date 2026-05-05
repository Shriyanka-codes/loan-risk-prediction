import React from "react";
import "./HeroSection.css";

function HeroSection() {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/student-bank.jpg)`, // ✅ this works perfectly
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      
    </section>
  );
}

export default HeroSection;
