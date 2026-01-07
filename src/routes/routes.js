// src/routes/Routes.tsx
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Signin from "../pages/Signin/Signin";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Farmers from "../pages/Farmers/Farmers";
import AIManagement from "../pages/AIManagement/AIManagement";
import Blogs from "../pages/Blogs/Blogs";
import Notifications from "../pages/Notifications/Notifications";
import Settings from "../pages/Settings/Settings";
import DashboardLayout from "../components/Layout/DashboardLayout";



const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Signin />} />
        <Route path="/register" element={<Register />} />

        {/* Protected / Dashboard routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} /> {/* /dashboard */}
          <Route path="farmers" element={<Farmers />} /> {/* /dashboard/farmers */}
          <Route path="ai-management" element={<AIManagement />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
