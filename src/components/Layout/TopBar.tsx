import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Badge,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";

interface TopbarProps {
  title?: string;
  notificationsCount?: number;
  onLogout?: () => void;
}

const Topbar: React.FC<TopbarProps> = ({
  title = "Dashboard",
  notificationsCount = 0,
  onLogout,
}) => {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={1}
      sx={{ borderBottom: "1px solid", borderColor: "divider", backgroundColor: "#background.paper",py:2 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Page Title */}
        <Typography variant="h1" fontWeight={600}>
          {title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton color="inherit">
            <Badge badgeContent={notificationsCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Avatar
            alt="Admin"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 36, height: 36 }}
          />

          <IconButton color="inherit" onClick={onLogout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
