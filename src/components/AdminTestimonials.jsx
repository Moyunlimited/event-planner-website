import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "../config";

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load testimonials
  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/feedback`);
      setTestimonials(res.data.testimonials || []);
    } catch (err) {
      console.error("Error loading testimonials:", err);
    }
  };

  // Check admin status
  const checkAdmin = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/is_admin`, {
        withCredentials: true,
      });
      setIsAdmin(res.data.admin);
    } catch (err) {
      console.error("Error checking admin status:", err);
    }
  };

  // Delete testimonial
  const deleteTestimonial = async (index) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await axios.delete(`${API_BASE}/api/feedback/${index}`, {
        withCredentials: true,
      });
      fetchTestimonials();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Could not delete testimonial");
    }
  };

  // Initial load
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
              <div className="p-3 border rounded bg-light text-dark shadow-sm h-100 position-relative">
                <h5 className="fw-bold">— {t.name}</h5>
                <p className="mb-0">{t.message}</p>
                <button
                  onClick={() => deleteTestimonial(index)}
                  className="btn btn-sm btn-danger position-absolute"
                  style={{ top: 10, right: 10 }}
                >
                  ✖
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminTestimonials;
 