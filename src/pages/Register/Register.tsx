import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { background, background2, logoGreen } from "../../assets";
import Input from "../../components/common/InputField";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PrimaryButton from "../../components/common/PrimaryButton";
import SecondaryButton from "../../components/common/SecondaryButton";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";

import { Link } from "react-router-dom";
import IconBtn from "../../components/common/IconBtn";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Grid
        container
        spacing={4}
        alignItems="center"
        sx={{
          height: "80vh",
          width: "80vw",
          overflow: "hidden",
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
          borderRadius: 3,
          flexDirection: "row",
        }}
      >
        {/* RIGHT SIDE - IMAGE */}
        <Grid size={5}>
          <Box
            width="100%"
            height="100%"
            sx={{ overflow: "hidden", position: "relative" }}
          >
            <img
              src={background2}
              alt="Illustration"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {/* Optional shadow overlay */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2))",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center", // vertical center
                alignItems: "center", // horizontal center
                textAlign: "center",
                px: 4, // thoda padding for text
                color: "white",
                width:"80%",
                mx:"auto"

              }}
            >
              <Typography variant="h1" mb={2}>
                Welcome Back
              </Typography>

              <Typography variant="h3" mb={3} sx={{ maxWidth: 400 }}>
                To keep connected with us please login with your personal info
              </Typography>

              <PrimaryButton name="Sign in" />
            </Box>
          </Box>
        </Grid>

        <Grid size={7} height="100%">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              px: 14,
              
                            alignItems: "center", // Center horizontally
            }}
          >
            <Box >
              <img
                src={logoGreen}
                alt="Logo"
                style={{ width: 200, height: "auto" }}
              />
            </Box>
            <Typography variant="h1" mb={2} sx={{ color: "text.primary" }}>
              Create account
            </Typography>

            <Stack flexDirection="row" justifyContent="space-evenly" my={3}>
              <IconBtn
                icon={<FacebookIcon />}
                width="30%"
                onClick={() => console.log("Facebook login clicked")}
              />
              <IconBtn
                icon={<GoogleIcon />}
                width="30%"
                onClick={() => console.log("Facebook login clicked")}
              />
              <IconBtn
                icon={<GitHubIcon />}
                width="30%"
                onClick={() => console.log("Facebook login clicked")}
              />
            </Stack>
            <Typography
              variant="body1"
              mb={6}
              textAlign="center"
              sx={{ color: "text.secondary" }}
            >
              or use your email for registration
            </Typography>

            <Input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              icon={<EmailIcon />}
            />

            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              icon={<EmailIcon />}
            />

            <Input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              icon={<LockIcon />}
            />

            <PrimaryButton name="Register" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
