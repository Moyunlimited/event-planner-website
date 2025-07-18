import React from "react";

const Footer = () => {
  return (
    <footer className="footer-section bg-black text-light py-4 mt-5">
      <div className="container text-center">
        <div className="mb-3 d-flex justify-content-center gap-4 flex-wrap">
          <a href="#about" className="text-light text-decoration-none">About</a>
          <a href="#services" className="text-light text-decoration-none">Services</a>
          <a href="#gallery" className="text-light text-decoration-none">Gallery</a>
          <a href="#contact" className="text-light text-decoration-none">Contact</a>
        </div>
        <div className="small">
          © {new Date().getFullYear()} Franci's Catering Services. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
