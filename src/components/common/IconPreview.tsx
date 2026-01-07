// src/components/IconsPreviewBox.tsx
import React from "react";
import { Box, Grid, Typography } from "@mui/material";

/* Topbar / Actions */
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

/* Dashboard Cards */
import GroupsIcon from "@mui/icons-material/Groups";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import BugReportIcon from "@mui/icons-material/BugReport";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

/* Table Actions */
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

/* AI / Stats */
import DatasetIcon from "@mui/icons-material/Storage";
import ModelTrainingIcon from "@mui/icons-material/AutoGraph";
import AccuracyIcon from "@mui/icons-material/TrendingUp";
import VerifiedIcon from "@mui/icons-material/Verified";

/* Status */
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

/* Charts */
import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PieChartIcon from "@mui/icons-material/PieChart";

const icons = [
  { name: "Search", icon: <SearchIcon /> },
  { name: "Menu", icon: <MenuIcon /> },
  { name: "Notifications", icon: <NotificationsIcon /> },
  { name: "Logout", icon: <LogoutIcon /> },
  { name: "Account", icon: <AccountCircleIcon /> },

  { name: "Total Farmers", icon: <GroupsIcon /> },
  { name: "Total Scans", icon: <DocumentScannerIcon /> },
  { name: "Diseases", icon: <BugReportIcon /> },
  { name: "Model Active", icon: <CheckCircleIcon /> },
  { name: "Model Warning", icon: <WarningAmberIcon /> },

  { name: "View", icon: <VisibilityIcon /> },
  { name: "Edit", icon: <EditIcon /> },
  { name: "Delete", icon: <DeleteOutlineIcon /> },

  { name: "Dataset", icon: <DatasetIcon /> },
  { name: "Training", icon: <ModelTrainingIcon /> },
  { name: "Accuracy", icon: <AccuracyIcon /> },
  { name: "Verified", icon: <VerifiedIcon /> },

  { name: "Success", icon: <CheckCircleOutlineIcon /> },
  { name: "Error", icon: <ErrorOutlineIcon /> },
  { name: "Info", icon: <InfoOutlinedIcon /> },

  { name: "Bar Chart", icon: <BarChartIcon /> },
  { name: "Line Chart", icon: <ShowChartIcon /> },
  { name: "Pie Chart", icon: <PieChartIcon /> },
];

const IconPreview: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        p: 3,
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <Typography variant="h6" fontWeight={600} mb={2}>
        Icons Preview (Verification Panel)
      </Typography>

      <Grid container spacing={3}>
        {icons.map((item, index) => (
          <Grid  key={index}>
            <Box
              sx={{
                textAlign: "center",
                p: 2,
                borderRadius: 2,
                bgcolor: "#f9fafb",
                transition: "0.25s",
                "&:hover": {
                  bgcolor: "rgba(25,118,210,0.08)",
                  transform: "translateY(-3px)",
                },
              }}
            >
              <Box sx={{ fontSize: 30, color: "primary.main" }}>
                {item.icon}
              </Box>
              <Typography variant="caption" mt={1} display="block">
                {item.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default IconPreview;
