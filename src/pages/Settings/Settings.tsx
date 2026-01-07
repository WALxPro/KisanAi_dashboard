import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
  FormControlLabel,
  Switch,
} from "@mui/material";

const Settings: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Box>
      {/* PAGE TITLE */}
      <Typography variant="h5" fontWeight={600} mb={3}>
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* ACCOUNT SETTINGS */}
        <Grid size={12}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Account Settings
              </Typography>

              <TextField
                fullWidth
                label="Full Name"
                placeholder="Enter your full name"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                placeholder="Enter your email"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Phone Number"
                placeholder="Enter phone number"
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary">
                Update Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* PASSWORD SETTINGS */}
        <Grid size={12}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Security
              </Typography>

              <TextField
                fullWidth
                type="password"
                label="Current Password"
                placeholder="Enter current password"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                type="password"
                label="New Password"
                placeholder="Enter new password"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                type="password"
                label="Confirm New Password"
                placeholder="Confirm new password"
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="warning">
                Change Password
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* NOTIFICATIONS & PREFERENCES */}
        <Grid size={12}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Preferences
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <FormControlLabel
                control={
                  <Switch checked={darkMode} onChange={handleDarkModeToggle} />
                }
                label="Enable Dark Mode"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
