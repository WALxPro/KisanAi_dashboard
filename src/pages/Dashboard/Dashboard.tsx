// src/dashboard/pages/Dashboard.tsx
import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
} from "@mui/material";
import DashCard from "../../components/common/DashCard";
import GroupsIcon from "@mui/icons-material/Groups";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import BugReportIcon from "@mui/icons-material/BugReport";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CropWiseChart from "../../components/Ui/CropWiseChart";
import CityWiseChart from "../../components/Ui/CityWiseChart";

export const dashboardCards = [
  {
    label: "Total Farmers",
    count: 120,
    icon: <GroupsIcon fontSize="large" />,
    color: "#4CAF50",
  },
  {
    label: "Total Scans",
    count: 450,
    icon: <DocumentScannerIcon fontSize="large" />,
    color: "#2196F3",
  },
  {
    label: "Diseases Detected",
    count: 35,
    icon: <BugReportIcon fontSize="large" />,
    color: "#F44336",
  },
  {
    label: "Model Status",
    count: 1,
    icon: <CheckCircleIcon fontSize="large" />,
    color: "#4CAF50",
  },
];

export const farmersData = [
  {
    id: "F001",
    name: "Ali Khan",
    profilePicture: "/static/images/avatar/1.jpg",
    city: "Lahore",
    crop: "Wheat",
    scans: 12,
  },
  {
    id: "F002",
    name: "Sara Ahmed",
    profilePicture: "/static/images/avatar/2.jpg",
    city: "Karachi",
    crop: "Rice",
    scans: 8,
  },
  {
    id: "F003",
    name: "Bilal Raza",
    profilePicture: "/static/images/avatar/3.jpg",
    city: "Islamabad",
    crop: "Maize",
    scans: 15,
  },
  {
    id: "F004",
    name: "Hina Malik",
    profilePicture: "/static/images/avatar/4.jpg",
    city: "Multan",
    crop: "Cotton",
    scans: 10,
  },
  {
    id: "F005",
    name: "Ahmed Ali",
    profilePicture: "/static/images/avatar/5.jpg",
    city: "Faisalabad",
    crop: "Sugarcane",
    scans: 5,
  },
];

const Dashboard: React.FC = () => {
  return (
    <Grid container spacing={3}>
      {/* Top Cards */}
      {dashboardCards.map((card, index) => (
        <Grid size={3} key={index}>
          <DashCard
            icon={card.icon}
            label={card.label}
            count={card.count}
            color={card.color}
          />
        </Grid>
      ))}

      <Grid size={6}>
        <CropWiseChart />
      </Grid>

      <Grid size={6}>
        <CityWiseChart />
      </Grid>

      <Grid size={12}>
        <TableContainer
          component={Paper}
          sx={{
            mt: 4,
            borderRadius: 3,
            p: 3,
            backgroundColor: "background.default",
          }}
        >
          <Typography variant="h6" fontWeight={600} sx={{ p: 2 }}>
            Recent Farmers
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Profile</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Crop</TableCell>
                <TableCell>Scans</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {farmersData.map((farmer) => (
                <TableRow key={farmer.id}>
                  <TableCell>{farmer.id}</TableCell>
                  <TableCell>{farmer.name}</TableCell>
                  <TableCell>
                    <Avatar src={farmer.profilePicture} alt={farmer.name} />
                  </TableCell>
                  <TableCell>{farmer.city}</TableCell>
                  <TableCell>{farmer.crop}</TableCell>
                  <TableCell>{farmer.scans}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
