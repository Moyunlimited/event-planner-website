import React, { useState } from "react";
import axios from "axios";
import API_BASE from "../config";

const HomepageImageUploader = ({ section, label }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await axios.post(
        `${API_BASE}/api/homepage-images/${section}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMsg("✅ Upload successful");
    } catch (err) {
      setMsg("❌ Upload failed");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <h5>{label}</h5>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*"
          className="form-control mb-2"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="btn btn-dark" type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {msg && <p className="mt-2">{msg}</p>}
      </form>
    </div>
  );
};

export default HomepageImageUploader;
