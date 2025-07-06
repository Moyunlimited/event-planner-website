import React from 'react';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">FRANCIS CATERING SERVICES</h1>
        <p className="hero-subtitle">
          EVENT PLANNER, BUFFET SERVICES, BOXES SURPRISES ETC
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
        <img src="/buffet2.jpg" alt="Dish 1" className="circle-img tall" />
        <img src="/beach.jpg" alt="Dish 2" className="circle-img" />
        <img
          src="https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_487/shutterstock_530221042_1"
          alt="Dish 3"
          className="circle-img"
        />
        <img src="/birthday.jpg" alt="Dish 4" className="circle-img tall" />
      </div>
    </section>
  );
};

export default Hero;
