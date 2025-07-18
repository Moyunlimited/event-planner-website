import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE from "../config";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // 🔁 Load gallery and check admin
  useEffect(() => {
    fetchImages();
    checkAdmin();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/gallery`);
      setImages(res.data.images);
    } catch (err) {
      console.error("Error loading images", err);
    }
  };

  const checkAdmin = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/is_admin`, {
        withCredentials: true,
      });
      setIsAdmin(res.data.admin);
    } catch (err) {
      console.error("Admin check failed", err);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please choose a file first");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${API_BASE}/api/gallery/upload`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setImages([...images, res.data.url]);
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const handleDelete = async (url) => {
    try {
      await axios.delete(`${API_BASE}/api/gallery/delete`, {
        withCredentials: true,
        data: { url },
      });
      setImages(images.filter((img) => img !== url));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="container my-5">
      <h3 className="text-center mb-4">Previous Events</h3>

      {/* Only show to admin */}
      {isAdmin && (
        <div className="mb-4">
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button onClick={handleUpload} className="btn btn-dark ms-2">
            Upload Image
          </button>
        </div>
      )}

      {/* Gallery */}
      <div className="row g-3">
        {images.map((url, index) => (
          <div className="col-md-4" key={index} style={{ position: "relative" }}>
            <img src={url} alt={`Event ${index}`} className="gallery-image" />
            {isAdmin && (
              <button
                className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                onClick={() => handleDelete(url)}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
