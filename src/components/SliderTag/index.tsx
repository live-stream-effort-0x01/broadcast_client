import React, { useState } from "react";
import './SliderTag.css';
// import '@digichanges/solid-slider/dist/slider.css';
import icon from "../icon";

const SliderComponent = () => {
  // Sample tag list to display in the slider
  const sampleTagList = [
    { name: "Tag", action: "true" },
    // { name: "Tag Tag", action: "false" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesToShow = 3;
  const totalSlides = sampleTagList.length; // Adjust for dynamic list length

  // Calculate the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  // Calculate the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  return (
    <>
      <button className="slider-tag-button-left" onClick={prevSlide}>
        <img src={icon.prev} alt="Previous" />
      </button>

      <div className="slider-container">
        {/* Display the tags */}
        <div className="slider-content">
          {sampleTagList.map((item, index) => (
            <div key={index} className="slide-tag">
              <div className={`slide-tag-title ${item.action === "true" ? "tag-true" : ""}`}>
                {item.name}
              </div>
              {/* Repeating items based on your initial code */}
              <div className="slide-tag-title">{item.name}</div>
              <div className="slide-tag-title tag-true">{item.name}</div>
              <div className="slide-tag-title">{item.name}</div>
              <div className="slide-tag-title">{item.name}</div>
              <div className="slide-tag-title">{item.name}</div>
              <div className="slide-tag-title tag-true">{item.name}</div>
              <div className="slide-tag-title tag-true">{item.name}</div>
              <div className="slide-tag-title tag-true">{item.name}</div>
              <div className="slide-tag-title">{item.name}</div>
            </div>
          ))}
        </div>
      </div>

      <button className="slider-tag-button-right" onClick={nextSlide}>
        <img src={icon.next} alt="Next" />
      </button>
    </>
  );
};

export default SliderComponent;
