import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "../config"; // adjust the path if needed

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(`${API_BASE}/feedback`);
      setTestimonials(res.data.testimonials || []);
    } catch (err) {
      console.error("Error loading testimonials:", err);
    }
  };

  const checkAdmin = async () => {
    try {
      const res = await axios.get(`${API_BASE}/is_admin`, { withCredentials: true });
      setIsAdmin(res.data.admin);
    } catch (err) {
      console.error("Error checking admin status:", err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
    checkAdmin();
  }, []);

  if (!isAdmin) return null; // Only show to admin

  return (
    <section className="py-5 bg-dark text-light">
      <div className="container">
        <h2 className="text-center mb-4">Client Testimonials</h2>
        <div className="row g-4">
          {testimonials.map((t, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12">
              <div className="p-3 border rounded bg-light text-dark shadow-sm h-100">
                <h5 className="fw-bold">— {t.name}</h5>
                <p className="mb-0">{t.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminTestimonials;
