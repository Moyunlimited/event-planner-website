import React, { useEffect, useState } from "react";
import HomepageImageUploader from "./HomepageImageUploader";
import axios from "axios";
import API_BASE from "../config";

const AdminHomepageEditor = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdmin = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/is_admin`, {
        withCredentials: true,
      });
      setIsAdmin(res.data.admin);
    } catch (err) {
      console.error("Admin check failed:", err);
    }
  };

  useEffect(() => {
    checkAdmin();
  }, []);

  if (!isAdmin) return null;

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">🖼️ Update Homepage Images</h2>
      <HomepageImageUploader section="decoration" label="Decoration Section" />
      <HomepageImageUploader section="buffet" label="Buffet Section" />
      <HomepageImageUploader section="surprise" label="Surprise Section" />
    </div>
  );
};

export default AdminHomepageEditor;
