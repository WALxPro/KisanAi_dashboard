import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import ArticleIcon from "@mui/icons-material/Article";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink } from "react-router-dom";
import { logoGreen, logoWhite } from "../../assets";

const sidebarItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { label: "Farmers", icon: <PeopleIcon />, path: "/dashboard/farmers" },
  {
    label: "AI Management",
    icon: <SmartToyIcon />,
    path: "/dashboard/ai-management",
  },
  { label: "Blogs", icon: <ArticleIcon />, path: "/dashboard/blogs" },
  {
    label: "Notifications",
    icon: <NotificationsIcon />,
    path: "/dashboard/notifications",
  },
  { label: "Settings", icon: <SettingsIcon />, path: "/dashboard/settings" },
];

const Sidebar: React.FC = () => {
  return (
    <Box
      sx={{
        width: 280,
        minWidth: 280, // ensures it never shrinks
        height: "100vh",
        backgroundColor: "#18222E",
        borderRight: "1px solid",
        borderColor: "divider",
        pr: 1,
        py: 3,
      }}
    >
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <img
          src={logoGreen}
          alt="Logo"
          style={{ width:  150, height: "auto" }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          my: 1,
          width: "100%",
        }}
      >
        <Box sx={{ flex: 1, height: "1px", backgroundColor: "grey.400" }} />

        <Box sx={{ flex: 1, height: "1px", backgroundColor: "grey.400" }} />
      </Box>

      <List>
        {sidebarItems.map((item) => (
          <ListItemButton
            key={item.label}
            component={NavLink}
            to={item.path}
            end={item.path === "/dashboard"} // ✅ ONLY dashboard exact
            sx={{
              position: "relative",
              color: "background.default",
              mb: 1,
              pl: 3,

              "& .MuiListItemIcon-root": {
                color: "background.default",
              },

              "&::before": {
                content: '""',
                position: "absolute",
                left: 0,
                height: "100%",
                width: "8px",
                backgroundColor: "#0492C4",
                opacity: 0,
                transition: "opacity 0.3s",
              },

              "&.active": {
                backgroundColor: "#293452",
                color: "#fff",
                fontWeight: 600,
                "&::before": {
                  opacity: 1,
                },
                "& .MuiListItemIcon-root": {
                  color: "#fff",
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
