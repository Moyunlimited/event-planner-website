import React, { useEffect, useState } from "react";
import axios from "axios";
import GalleryUpload from "./GalleryUpload";
import API_BASE from "../config";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch gallery from backend
  const fetchGallery = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/gallery`);
      setImages(res.data.images || []);
    } catch (error) {
      console.error("Error loading gallery:", error);
    }
  };

  // Check admin session
  const checkAdmin = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/is_admin`, {
        withCredentials: true,
      });
      setIsAdmin(res.data.admin);
    } catch (error) {
      console.error("Error checking admin status:", error);
    }
  };

  // Delete by index
  const deleteImage = async (index) => {
    try {
      await axios.delete(`${API_BASE}/api/gallery/delete/${index}`, {
        withCredentials: true,
      });
      fetchGallery();
    } catch (err) {
      alert("Delete failed");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGallery();
    checkAdmin();
  }, []);

  return (
    <section id="gallery" className="py-5 bg-dark text-white">
      <div className="container">
        <h2 className="text-center mb-4">Previous Events</h2>
        <div className="row g-4">
          {images.length > 0 ? (
            images.map((img, i) => (
              <div key={i} className="col-lg-4 col-md-6 col-12 position-relative">
                {isAdmin && (
                  <button
                    onClick={() => deleteImage(i)}
                    className="btn btn-sm btn-danger position-absolute"
                    style={{ top: 1, right: 12, zIndex: 2 }}
                  >
                    ✖
                  </button>
                )}
                <img
                  src={img}
                  alt={`gallery-${i}`}
                  className="img-fluid rounded shadow-sm"
                  style={{ width: "100%", height: "250px", objectFit: "cover" }}
                />
              </div>
            ))
          ) : (
            <p className="text-center py-4">No images available.</p>
          )}
        </div>

        {isAdmin && (
          <div className="mt-5">
            <GalleryUpload onUploadSuccess={fetchGallery} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
