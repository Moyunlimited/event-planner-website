import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "../config";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchGallery();
    checkAdmin();
  }, []);

  const fetchGallery = async () => {
    const res = await axios.get(`${API_BASE}/api/gallery`);
    setImages(res.data.images || []);
  };

  const checkAdmin = async () => {
    const res = await axios.get(`${API_BASE}/api/is_admin`, {
      withCredentials: true,
    });
    setIsAdmin(res.data.admin);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${API_BASE}/api/gallery/upload`, formData, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setImages([...images, res.data.url]);
        setFile(null);
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const handleDelete = async (url) => {
    try {
      const res = await axios.delete(`${API_BASE}/api/gallery/delete`, {
        data: { url }, // ✅ FIXED: send url in data
        withCredentials: true,
      });

      if (res.status === 200) {
        setImages(images.filter((img) => img !== url));
        alert("Deleted successfully");
      }
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Previous Events</h2>
      <div className="row">
        {images.map((url, index) => (
          <div key={index} className="col-md-4 mb-3 position-relative">
            <img src={url} alt={`Event ${index}`} className="img-fluid rounded shadow" />
            {isAdmin && (
              <button
                onClick={() => handleDelete(url)}
                className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
              >
                ✖
              </button>
            )}
          </div>
        ))}
      </div>

      {isAdmin && (
        <div className="mt-4 text-center">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="form-control mb-2"
          />
          <button onClick={handleUpload} className="btn btn-dark">
            Upload Image
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
