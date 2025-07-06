import React from "react";

const AboutUs = () => {
  return (
    <section id="about" className="py-5" style={{ backgroundColor: "#121212", color: "#fff" }}>
      <div className="container">
        <h2 className="text-center mb-4">About Us</h2>
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src="/logo1.png" 
              alt="About Francis Catering"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <p className="lead text-light">
              At <strong>Francis Catering</strong>, we specialize in creating unforgettable moments through personalized event planning, elegant buffet services, and beautifully curated surprise boxes.
            </p>
            <p className="text-light">
              Whether it's a birthday, wedding, baby shower, or a corporate event — our mission is to take your vision and bring it to life with creativity, passion, and professional service.
            </p>
            <p className="text-light">
              From decorations to food to custom gifts, we make sure every detail is handled with care. Let us help you make your next event seamless and stress-free.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
