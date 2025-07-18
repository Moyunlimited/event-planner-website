import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "../config";

const Hero = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/homepage/images`);
        setImages(res.data.images || []);
      } catch (error) {
        console.error("Failed to load homepage images", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">FRANCI'S CATERING SERVICES</h1>
        <p className="hero-subtitle">
          EVENT PLANNER, BUFFET SERVICES, BOXES SURPRISES
        </p>
        <a
          href="https://wa.me/17863192886?text=Hello,%20I%20am%20interested%20in%20booking%20Francis%20Catering%20for%20an%20event."
          target="_blank"
          rel="noopener noreferrer"
          className="hero-button"
        >
          GET A QUOTE
        </a>
      </div>

      <div className="hero-images">
        {images.length === 4 && images.some((img) => img) ? (
          images.map((src, index) =>
            src ? (
              <img
                key={index}
                src={src}
                alt={`Dish ${index + 1}`}
                className={`circle-img ${index % 2 === 0 ? "tall" : ""}`}
              />
            ) : null
          )
        ) : (
          <>
            <img src="/buffet2.jpg" alt="Dish 1" className="circle-img tall" />
            <img src="/beach.jpg" alt="Dish 2" className="circle-img" />
            <img
              src="https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/shutterstock_530221042_1"
              alt="Dish 3"
              className="circle-img"
            />
            <img src="/birthday.jpg" alt="Dish 4" className="circle-img tall" />
          </>
        )}
      </div>
    </section>
  );
};

export default Hero;
