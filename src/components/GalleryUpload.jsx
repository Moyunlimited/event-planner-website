import React, { useState } from "react";
import axios from "axios";
import API_BASE from "../config"; 

const GalleryUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${API_BASE}/api/gallery/upload`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onUploadSuccess(); 
      setFile(null);
    } catch (error) {
      alert("Upload failed");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 text-center">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="form-control mb-2"
      />
      <button className="btn btn-dark" type="submit">
        Upload Image
      </button>
    </form>
  );
};

export default GalleryUpload;
