import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS for carousel functionality

function Carousel() {
  return (
    <div id="carouselExample" className="carousel slide">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLBPluiX2Jul9WJjhaUAlP6M-5CAEChIYTKA&s"
            className="d-block w-100"
            alt="First Slide"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://via.placeholder.com/800x400?text=Second+Slide"
            className="d-block w-100"
            alt="Second Slide"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://via.placeholder.com/800x400?text=Third+Slide"
            className="d-block w-100"
            alt="Third Slide"
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;
