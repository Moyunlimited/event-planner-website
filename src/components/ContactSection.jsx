import React from "react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-5 bg-dark" style={{ backgroundColor: "#121212", color: "#fff" }}>
      <div className="container text-center">
        <h2 className="mb-4">Contact Us</h2>
        <p className="lead">
          Have questions or ready to plan your event? We'd love to hear from you.
        </p>

        <div className="my-4">
          <p><strong>📞 Phone:</strong> (786) 3192886</p>
          <p><strong>📍 Location:</strong> Miami, Florida</p>
          <p><strong>📧 Email:</strong> franciscatering@gmail.com</p>
        </div>

        <a
          href="https://wa.me/17863192886"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-success fw-bold px-4 py-2"
        >
          Message us on WhatsApp
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
