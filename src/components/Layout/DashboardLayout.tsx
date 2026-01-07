import React from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./TopBar";
import { pageTitles } from "./dashboard";


const DashboardLayout: React.FC = () => {
  const location = useLocation();

  const title =
    pageTitles[location.pathname] || "Dashboard";

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Topbar title={title} /> 
        <Box sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
