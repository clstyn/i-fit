// src/components/Slider.js

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import "./slider.css";

const slides = [
  { id: 1, content: "Slide 1" },
  { id: 2, content: "Slide 2" },
  { id: 3, content: "Slide 3" },
  { id: 4, content: "Slide 4" },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRefs = useRef([]);

  useEffect(() => {
    gsap.to(slideRefs.current[currentSlide], {
      scale: 1.2,
      zIndex: 10,
      duration: 0.5,
      ease: "power1.inOut",
    });

    slideRefs.current.forEach((slide, index) => {
      if (index !== currentSlide) {
        gsap.to(slide, {
          scale: 0.8,
          zIndex: 1,
          duration: 0.5,
          ease: "power1.inOut",
        });
      }
    });
  }, [currentSlide]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="slider-container">
      <button onClick={handlePrev}>Previous</button>
      <div className="slider">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            ref={(el) => (slideRefs.current[index] = el)}
            className="slide"
          >
            {slide.content}
          </div>
        ))}
      </div>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Slider;
