import React from "react";
import "./MainCarousel.css";

import Carousel from "react-bootstrap/Carousel";
import CarouselImage1 from "/images/sieuwert-otterloo-aren8nutd1Q-unsplash_6aa03d5ded604be58cd5ea00efdb0a6d.jpg";
import CarouselImage2 from "/images/1_516b72b60bbb43428a3330cc03c287ff.jpg";
import CarouselImage3 from "/images/todd-kent-178j8tJrNlc-unsplash_9fbc85da894043419dba3025c9818daf.jpg";
import CarouselImage4 from "/images/ralph-ravi-kayden-2d4lAQAlbDA-unsplash_f685097ac49a426c8c1caa685b54c95c.jpg";
import CarouselImage5 from "/images/etienne-beauregard-riverin-B0aCvAVSX8E-unsplash_d2ab9b9f78c542259668c00afb8b29fa.jpg";

const images = [
  CarouselImage1,
  CarouselImage2,
  CarouselImage3,
  CarouselImage4,
  CarouselImage5,
];
const MainCarousel = () => {
  return (
    <>
      <div className="main-carousel">
        {/* <Carousel className="carousel1">
          {images.map((image, index) => (
            <Carousel.Item key={index} className="carousel1-img">
              <img src={image} alt="" />
            </Carousel.Item>
          ))}
        </Carousel> */}
        <div className="welcome-tag">
          <p className="welcome-text">Welcome to KejaSpace. We will help you find your dream home</p>
        </div>
      </div>
    </>
  );
};

export default MainCarousel;
