import React from "react";

const Services = () => {
  const phoneNumber = "19548579149";

  const services = [
    {
      title: "Decoration",
      description:
        "Elegant event setups with balloons, floral arrangements, and custom themes for all occasions.",
      image: "https://static.wixstatic.com/media/b3ae02_431c64aa6b2646e28f370dc6a27332ad~mv2.jpg",
      message: "I'm interested in your Decoration service!",
    },
    {
      title: "Buffet",
      description:
        "Beautifully arranged grazing tables, finger foods, and desserts tailored to your celebration.",
      image: "https://www.onstage.com.au/wp-content/uploads/2024/05/buffet-table-food-display-ideas-2.jpg",
      message: "I'd like to learn more about your Buffet and grazing table services!",
    },
    {
      title: "Surprise Boxes",
      description:
        "Customized gift boxes with snacks, drinks, and decor — perfect for birthdays, anniversaries & more.",
      image: "https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg",
      message: "I'm looking to order one of your Surprise Boxes — can you help?",
    },
  ];

  return (
    <section id="services" className="py-5 bg-dark text-white">
      <div className="container">
        <h2 className="text-center mb-5">Our Services</h2>
        <div className="row g-4 justify-content-center">
          {services.map((item, index) => (
            <div className="col-lg-4 col-md-6 col-sm-6 col-12" key={index}>
              <div className="card h-100 shadow-sm text-center bg-secondary text-white">
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <a
                    href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                      "Hi Francis Catering, " + item.message
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-warning mt-auto text-dark fw-semibold"
                  >
                    👉 Book This Service
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
