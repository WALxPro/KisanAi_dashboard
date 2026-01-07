import React, { useState } from "react";
import {
  Avatar,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Chip,
  Stack,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import BlockIcon from "@mui/icons-material/Block";

export const farmersData = [
  {
    id: "F001",
    name: "Ali Khan",
    profilePicture: "/static/images/avatar/1.jpg",
    city: "Lahore",
    crop: "Wheat",
    scans: 12,
    phone: "0301-1234567",
    email: "alikhan@email.com",
    isBlocked: false,
  },
  {
    id: "F002",
    name: "Sara Ahmed",
    profilePicture: "/static/images/avatar/2.jpg",
    city: "Karachi",
    crop: "Rice",
    scans: 8,
    phone: "0321-7654321",
    email: "sara@email.com",
    isBlocked: true,
  },
];

// Dummy Queries
const dummyQueries = [
  {
    id: "Q001",
    subject: "Scan not working",
    message: "My crop scan fails every time.",
    date: "12 Sep 2025",
    status: "Pending",
  },
  {
    id: "Q002",
    subject: "App crash",
    message: "App closes after upload.",
    date: "15 Sep 2025",
    status: "Resolved",
  },
];

const Farmers: React.FC = () => {
  const [selectedFarmer, setSelectedFarmer] = useState<any>(null);
  const [openQueries, setOpenQueries] = useState(false);
  const [openView, setOpenView] = useState(false);

  const handleOpenQueries = (farmer: any) => {
    setSelectedFarmer(farmer);
    setOpenQueries(true);
  };

  const handleOpenView = (farmer: any) => {
    setSelectedFarmer(farmer);
    setOpenView(true);
  };

  const handleCloseAll = () => {
    setOpenQueries(false);
    setOpenView(false);
    setSelectedFarmer(null);
  };

  return (
    <>
      <Grid size={12}>
        <TableContainer
          sx={{
            mt: 4,
            borderRadius: 3,
            p: 3,
            backgroundColor: "background.default",
          }}
        >
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            All Farmers
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
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {farmersData.map((farmer) => (
                <TableRow key={farmer.id} hover>
                  <TableCell>{farmer.id}</TableCell>
                  <TableCell>{farmer.name}</TableCell>
                  <TableCell>
                    <Avatar src={farmer.profilePicture} />
                  </TableCell>
                  <TableCell>{farmer.city}</TableCell>
                  <TableCell>{farmer.crop}</TableCell>
                  <TableCell>{farmer.scans}</TableCell>

                  <TableCell align="center">
                    <Tooltip title="View Farmer">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenView(farmer)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="View Queries">
                      <IconButton
                        color="info"
                        onClick={() => handleOpenQueries(farmer)}
                      >
                        <QuestionAnswerIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip
                      title={farmer.isBlocked ? "Blocked" : "Block Farmer"}
                    >
                      <IconButton color="error">
                        <BlockIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      {/* ================= VIEW FARMER MODAL ================= */}
      <Dialog open={openView} onClose={handleCloseAll} maxWidth="sm" fullWidth>
        <DialogTitle>Farmer Details</DialogTitle>

        <DialogContent dividers>
          {selectedFarmer && (
            <Stack spacing={2} alignItems="center">
              <Avatar
                src={selectedFarmer.profilePicture}
                sx={{ width: 90, height: 90 }}
              />

              <Typography variant="h6">
                {selectedFarmer.name}
              </Typography>

              <Chip
                label={selectedFarmer.isBlocked ? "Blocked" : "Active"}
                color={selectedFarmer.isBlocked ? "error" : "success"}
              />

              <Box width="100%">
                <Typography><b>ID:</b> {selectedFarmer.id}</Typography>
                <Typography><b>Email:</b> {selectedFarmer.email}</Typography>
                <Typography><b>Phone:</b> {selectedFarmer.phone}</Typography>
                <Typography><b>City:</b> {selectedFarmer.city}</Typography>
                <Typography><b>Crop:</b> {selectedFarmer.crop}</Typography>
                <Typography><b>Total Scans:</b> {selectedFarmer.scans}</Typography>
              </Box>
            </Stack>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseAll}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* ================= QUERIES MODAL ================= */}
      <Dialog
        open={openQueries}
        onClose={handleCloseAll}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Farmer Queries – {selectedFarmer?.name}
        </DialogTitle>

        <DialogContent dividers>
          {dummyQueries.map((query) => (
            <Box key={query.id} mb={2} p={2} bgcolor="grey.100" borderRadius={2}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
              >
                <Typography fontWeight={600}>
                  {query.subject}
                </Typography>

                <Chip
                  label={query.status}
                  size="small"
                  color={query.status === "Pending" ? "warning" : "success"}
                />
              </Box>

              <Typography variant="body2">{query.message}</Typography>
              <Typography variant="caption" color="text.secondary">
                {query.date}
              </Typography>
            </Box>
          ))}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseAll}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Farmers;
