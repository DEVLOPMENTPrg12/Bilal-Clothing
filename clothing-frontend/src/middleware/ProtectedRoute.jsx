// src/middleware/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔒 ما كاينش المستخدم => رجع login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 🔒 عندنا role خاص وما كاينش فـ list المسموح بها
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // ✅ المستخدم عندو الصلاحية
  return children;
};

export default ProtectedRoute;
