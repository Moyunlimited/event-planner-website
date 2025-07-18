import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "../config";

const Services = () => {
  const phoneNumber = "17863192886";

  const [images, setImages] = useState({
    decoration: "",
    buffet: "",
    surprise: ""
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [files, setFiles] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [imageRes, adminRes] = await Promise.all([
          axios.get(`${API_BASE}/api/service-images`),
          axios.get(`${API_BASE}/api/is_admin`, { withCredentials: true })
        ]);
        setImages(imageRes.data);
        setIsAdmin(adminRes.data.admin);
      } catch (err) {
        console.error("Failed to load service images or admin status", err);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (section, event) => {
    setFiles((prev) => ({ ...prev, [section]: event.target.files[0] }));
  };

  const handleUpload = async (section) => {
    if (!files[section]) return;

    const formData = new FormData();
    formData.append("file", files[section]);
    formData.append("section", section);

    try {
      const res = await axios.post(`${API_BASE}/api/service-images`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
      });

      setImages((prev) => ({ ...prev, [section]: res.data.url }));
      alert(`${section} image updated!`);
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  const services = [
    {
      key: "decoration",
      title: "Decoration",
      description:
        "Elegant event setups with balloons, floral arrangements, and custom themes for all occasions.",
      message: "I'm interested in your Decoration service!",
    },
    {
      key: "buffet",
      title: "Buffet",
      description:
        "Beautifully arranged grazing tables, finger foods, and desserts tailored to your celebration.",
      message: "I'd like to learn more about your Buffet and grazing table services!",
    },
    {
      key: "surprise",
      title: "Surprise Boxes",
      description:
        "Customized gift boxes with snacks, drinks, and decor — perfect for birthdays, anniversaries & more.",
      message: "I'm looking to order one of your Surprise Boxes — can you help?",
    },
  ];

  return (
    <section id="services" className="py-5 bg-dark text-white">
      <div className="container">
        <h2 className="text-center mb-5">Our Services</h2>
        <div className="row g-4 justify-content-center">
          {services.map((item) => (
            <div className="col-lg-4 col-md-6 col-sm-6 col-12" key={item.key}>
              <div className="card h-100 shadow-sm text-center bg-secondary text-white">
                <img
                  src={
                    images[item.key] ||
                    "https://via.placeholder.com/400x200?text=Loading+Image"
                  }
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
                  {isAdmin && (
                    <div className="mt-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(item.key, e)}
                        className="form-control mb-2"
                      />
                      <button
                        className="btn btn-sm btn-light"
                        onClick={() => handleUpload(item.key)}
                      >
                        Upload New Image
                      </button>
                    </div>
                  )}
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
