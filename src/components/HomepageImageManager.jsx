import React, { useState } from "react";
import axios from "axios";
import API_BASE from "../config";

const HomepageImageManager = () => {
  const [files, setFiles] = useState([null, null, null, null]);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (index, event) => {
    const updatedFiles = [...files];
    updatedFiles[index] = event.target.files[0];
    setFiles(updatedFiles);
  };

  const handleUpload = async (index) => {
    const file = files[index];
    if (!file) return alert("Please select a file first");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("index", index); 

    try {
      const res = await axios.post(`${API_BASE}/api/homepage-images`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Uploaded:", res.data);
      setUploadStatus(`Image ${index + 1} uploaded! ✅`);

      window.location.reload();
    } catch (err) {
      console.error(err);
      setUploadStatus("Upload failed ❌");
    }
  };

  return (
    <div className="container my-5 text-center">
      <h2>Homepage Image Manager</h2>
      <div className="row">
        {[0, 1, 2, 3].map((index) => (
          <div className="col-md-6 mb-4" key={index}>
            <p>Hero {index + 1}</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(index, e)}
              className="form-control mb-2"
            />
            <button className="btn btn-dark" onClick={() => handleUpload(index)}>
              Update Image {index + 1}
            </button>
          </div>
        ))}
      </div>
      {uploadStatus && <p className="mt-3">{uploadStatus}</p>}
    </div>
  );
};

export default HomepageImageManager;
