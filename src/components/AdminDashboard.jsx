import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE from "../config";

const AdminDashboard = () => {
  const [file, setFile] = useState(null);
  const [homepageImage, setHomepageImage] = useState("");

  useEffect(() => {
    fetchCurrentImage();
  }, []);

  const fetchCurrentImage = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/homepage/image`);
      setHomepageImage(res.data.url);
    } catch (error) {
      console.error("Failed to load current homepage image", error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${API_BASE}/api/homepage/upload`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Homepage image updated!");
      setFile(null);
      fetchCurrentImage();
    } catch (error) {
      alert("Upload failed");
      console.error(error);
    }
  };

  return (
    <div className="container py-5">
      <h2>Admin Dashboard</h2>

      <div className="mt-4">
        <h4>Edit Homepage Hero Image</h4>

        {homepageImage && (
          <div className="mb-3">
            <img
              src={homepageImage}
              alt="Homepage"
              style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
              className="rounded shadow-sm"
            />
          </div>
        )}

        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="form-control mb-2"
          />
          <button className="btn btn-dark" type="submit">
            Upload New Homepage Image
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
