import React from 'react';

const testimonials = [
  {
    name: 'Marie D.',
    quote: "Francis Catering made our wedding unforgettable! The food, the decor, the vibe — just perfect.",
    stars: 5,
  },
  {
    name: 'James L.',
    quote: "I ordered a surprise box for my wife’s birthday — she cried happy tears. Beautiful presentation!",
    stars: 5,
  },
  {
    name: 'Sandra K.',
    quote: "Everything was seamless from start to finish. Highly recommend them for any event.",
    stars: 4,
  },
];

const renderStars = (count) => {
  return '⭐️'.repeat(count);
};

const Testimonial = () => {
  return (
    <section className="testimonial-section">
      <h2 className="testimonial-title">What Our Clients Say</h2>
      <div className="testimonial-container">
        {testimonials.map((t, index) => (
          <div key={index} className="testimonial-card">
            <p className="testimonial-quote">“{t.quote}”</p>
            <p className="testimonial-name">— {t.name}</p>
            <p className="testimonial-stars">{renderStars(t.stars)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
