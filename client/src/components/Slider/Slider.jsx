import { useState } from 'react';
import './Slider.css'

const Slider = () => {
  const [index, setIndex] = useState(0);
  const images = [
    "/img/cover1.png",
    "/img/cover.jpg",
    "/img/cover2.png"
  ];

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="slider">
      <button className="arrow left" onClick={prevSlide}>&#8249;</button>
      <img src={images[index]} alt={`Slide ${index + 1}`} className="slide" />
      <button className="arrow right" onClick={nextSlide}>&#8250;</button>
    </div>
  );
};

export default Slider;
