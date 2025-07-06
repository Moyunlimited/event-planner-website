import React, { useState } from "react";
import axios from "axios";
import API_BASE from "../config"; // make sure path is correct

const TestimonialForm = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/feedback`, { name, message });
      setSubmitted(true);
      setName("");
      setMessage("");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error sending feedback:", err);
      alert("Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 bg-dark text-white">
      <h2 className="text-center mb-4">Leave a Testimonial</h2>
      {submitted ? (
        <p className="text-success text-center">✅ Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: 600 }}>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              placeholder="Your Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Your Feedback"
              value={message}
              required
              rows={4}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button
            className="btn btn-warning fw-bold w-100"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default TestimonialForm;
